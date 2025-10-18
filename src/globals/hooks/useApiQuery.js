import { useQuery } from "@tanstack/react-query";

function useApiQuery({ key, queryFn, time = 5, select, ...options }) {
	return useQuery({
		queryKey: key,
		queryFn,
		staleTime: 1000 * 60 * time,
		select,
		...options,
	});
}

export default useApiQuery;
