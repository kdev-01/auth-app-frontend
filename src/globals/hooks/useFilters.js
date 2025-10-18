import {
	countActiveFilters,
	createFilterMatcher,
	isFilterActive,
} from "@globals/utils";
import { useCallback, useMemo, useRef, useState } from "react";

function useFilters(items, filterConfig, initialState = {}) {
	const initialStateRef = useRef(initialState);
	const [filters, setFilters] = useState(initialState);

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
		setFilters(initialStateRef.current);
	}, []);

	const compiledMatchers = useMemo(() => {
		const configList = Array.isArray(filterConfig) ? filterConfig : [];
		return configList.map((filter) =>
			createFilterMatcher(filter, filters[filter.key]),
		);
	}, [filterConfig, filters]);

	const filteredItems = useMemo(() => {
		if (!Array.isArray(items) || items.length === 0) return [];
		if (!Array.isArray(filterConfig) || filterConfig.length === 0) return items;
		return items.filter((item) =>
			compiledMatchers.every((matcher) => matcher(item)),
		);
	}, [items, filterConfig, compiledMatchers]);

	const activeCount = useMemo(
		() => countActiveFilters(filters, filterConfig),
		[filters, filterConfig],
	);

	const hasActiveFilters = activeCount > 0;

	const isActive = useCallback(
		(filterKey) => isFilterActive(filterKey, filters, filterConfig),
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
