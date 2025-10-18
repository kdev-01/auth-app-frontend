import { useMemo, useState } from "react";

function useSearchFilter(items, searchFn) {
	const [search, setSearch] = useState("");

	const filteredItems = useMemo(() => {
		const query = search.toLowerCase();
		return items.filter((item) => searchFn(item).toLowerCase().includes(query));
	}, [items, search, searchFn]);

	return { search, setSearch, filteredItems };
}

export default useSearchFilter;
