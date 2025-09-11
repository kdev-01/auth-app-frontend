import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function useFilters(items, filterConfig, initialState = {}) {
	const initialRef = useRef(initialState);
	const [filters, setFilters] = useState(initialState);

	useEffect(() => {
		initialRef.current = initialState;
	}, [initialState]);

	const setFilter = useCallback((filterKey, valueOrUpdater) => {
		setFilters((currentFilters) => {
			const nextValue =
				typeof valueOrUpdater === "function"
					? valueOrUpdater(currentFilters[filterKey])
					: valueOrUpdater;

			if (nextValue == null) {
				const { [filterKey]: _removed, ...rest } = currentFilters;
				return rest;
			}
			return { ...currentFilters, [filterKey]: nextValue };
		});
	}, []);

	const removeFilter = useCallback((filterKey) => {
		setFilters((currentFilters) => {
			const { [filterKey]: _removed, ...rest } = currentFilters;
			return rest;
		});
	}, []);

	const resetFilters = useCallback(() => {
		setFilters(initialRef.current);
	}, []);

	const normalizeEnum = (value) => {
		if (!value) return null;
		if (value instanceof Set) return value;
		if (Array.isArray(value)) return new Set(value);
		return null;
	};

	const compiledMatchers = useMemo(() => {
		const configList = Array.isArray(filterConfig) ? filterConfig : [];

		return configList.map((filterDef) => {
			const currentValue = filters[filterDef.key];

			const getItemValue = filterDef.accessor
				? (item) => filterDef.accessor(item)
				: (item) => item?.[filterDef.key];

			if (typeof filterDef.predicate === "function") {
				return (item) =>
					filterDef.predicate.length >= 3
						? filterDef.predicate(getItemValue(item), item, currentValue)
						: filterDef.predicate(item, currentValue);
			}

			switch (filterDef.type) {
				case "enum": {
					const selected = normalizeEnum(currentValue);
					if (!selected || selected.size === 0) return () => true;
					return (item) => selected.has(getItemValue(item));
				}
				case "boolean": {
					return (item) => {
						if (typeof currentValue !== "boolean") return true;
						const raw = getItemValue(item);
						const coerced =
							filterDef.strictBoolean === true
								? raw === true || raw === false
									? raw
									: Boolean(raw)
								: Boolean(raw);
						return coerced === currentValue;
					};
				}
				case "triState": {
					return (item) => {
						const mode = currentValue ?? "all";
						if (mode === "all") return true;
						const isTrue = Boolean(getItemValue(item));
						return mode === "only" ? isTrue : !isTrue;
					};
				}
				case "rangeNumber": {
					return (item) => {
						if (!currentValue) return true;
						const { min, max } = currentValue;
						const n = Number(getItemValue(item));
						if (!Number.isFinite(n)) return false;
						if (min != null && n < Number(min)) return false;
						if (max != null && n > Number(max)) return false;
						return true;
					};
				}
				default:
					return () => true;
			}
		});
	}, [filterConfig, filters]);

	const filteredItems = useMemo(() => {
		if (!Array.isArray(items) || items.length === 0) return [];
		if (!Array.isArray(filterConfig) || filterConfig.length === 0) return items;
		return items.filter((item) =>
			compiledMatchers.every((matcher) => matcher(item)),
		);
	}, [items, filterConfig, compiledMatchers]);

	const activeCount = useMemo(() => {
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
				currentValue !== "all"
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
	}, [filters, filterConfig]);

	const hasActiveFilters = activeCount > 0;

	const isActive = useCallback(
		(filterKey) => {
			const filterDef = (Array.isArray(filterConfig) ? filterConfig : []).find(
				(d) => d.key === filterKey,
			);
			if (!filterDef) return false;

			const currentValue = filters[filterKey];
			if (filterDef.type === "enum") return !!normalizeEnum(currentValue)?.size;
			if (filterDef.type === "boolean")
				return typeof currentValue === "boolean";
			if (filterDef.type === "triState")
				return currentValue && currentValue !== "all";
			if (filterDef.type === "rangeNumber")
				return (
					currentValue && (currentValue.min != null || currentValue.max != null)
				);
			return false;
		},
		[filters, filterConfig],
	);

	return {
		filters,
		setFilter,
		removeFilter,
		resetFilters,
		filteredItems,
		activeCount,
		hasActiveFilters,
		isActive,
	};
}

export default useFilters;
