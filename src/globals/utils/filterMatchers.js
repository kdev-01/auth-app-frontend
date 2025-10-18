const normalizeEnum = (value) => {
	if (!value) return null;
	if (value instanceof Set) return value;
	if (Array.isArray(value)) return new Set(value);
	return null;
};

const createEnumMatcher = (currentValue, getItemValue) => {
	const selected = normalizeEnum(currentValue);
	if (!selected || selected.size === 0) return () => true;
	return (item) => selected.has(getItemValue(item));
};

const createBooleanMatcher = (currentValue, getItemValue, strictBoolean) => {
	return (item) => {
		if (typeof currentValue !== "boolean") return true;
		const raw = getItemValue(item);
		const coerced =
			strictBoolean === true
				? raw === true || raw === false
					? raw
					: Boolean(raw)
				: Boolean(raw);
		return coerced === currentValue;
	};
};

const createTriStateMatcher = (currentValue, getItemValue) => {
	return (item) => {
		const mode = currentValue ?? "all";
		if (mode === "all") return true;
		const isTrue = Boolean(getItemValue(item));
		if (mode === "only") return isTrue;
		if (mode === "exclude") return !isTrue;
		return true;
	};
};

const createRangeMatcher = (currentValue, getItemValue) => {
	return (item) => {
		if (!currentValue) return true;
		const { min, max } = currentValue;
		const n = Number(getItemValue(item));
		if (!Number.isFinite(n)) return false;
		if (min != null && n < Number(min)) return false;
		if (max != null && n > Number(max)) return false;
		return true;
	};
};

export const createFilterMatcher = (filter, currentValue) => {
	const getItemValue = filter.accessor
		? (item) => filter.accessor(item)
		: (item) => item?.[filter.key];

	if (typeof filter.predicate === "function") {
		return (item) =>
			filter.predicate.length >= 3
				? filter.predicate(getItemValue(item), item, currentValue)
				: filter.predicate(item, currentValue);
	}

	switch (filter.type) {
		case "enum":
			return createEnumMatcher(currentValue, getItemValue);
		case "boolean":
			return createBooleanMatcher(
				currentValue,
				getItemValue,
				filter.strictBoolean,
			);
		case "triState":
			return createTriStateMatcher(currentValue, getItemValue);
		case "rangeNumber":
			return createRangeMatcher(currentValue, getItemValue);
		default:
			return () => true;
	}
};

export const countActiveFilters = (filters, filterConfig) => {
	const configList = Array.isArray(filterConfig) ? filterConfig : [];
	return configList.reduce((count, filterDef) => {
		const currentValue = filters[filterDef.key];

		if (filterDef.type === "enum") {
			const set = normalizeEnum(currentValue);
			return count + (set?.size || 0);
		}
		if (filterDef.type === "boolean" && typeof currentValue === "boolean") {
			return count + 1;
		}
		if (
			filterDef.type === "triState" &&
			currentValue &&
			currentValue !== "exclude"
		) {
			return count + 1;
		}
		if (
			filterDef.type === "rangeNumber" &&
			currentValue &&
			(currentValue.min != null || currentValue.max != null)
		) {
			return count + 1;
		}
		return count;
	}, 0);
};

export const isFilterActive = (filterKey, filters, filterConfig) => {
	const filterDef = (Array.isArray(filterConfig) ? filterConfig : []).find(
		(d) => d.key === filterKey,
	);
	if (!filterDef) return false;

	const currentValue = filters[filterKey];
	if (filterDef.type === "enum") return !!normalizeEnum(currentValue)?.size;
	if (filterDef.type === "boolean") return typeof currentValue === "boolean";
	if (filterDef.type === "triState")
		return currentValue && currentValue !== "all";
	if (filterDef.type === "rangeNumber")
		return (
			currentValue && (currentValue.min != null || currentValue.max != null)
		);
	return false;
};
