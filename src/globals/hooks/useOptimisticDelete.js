import { useMutation, useQueryClient } from "@tanstack/react-query";
function useOptimisticDelete({
	mutationFn,
	queryKey,
	selectId = (item) => item.id,
	options = {},
}) {
	const { refetchOnSettle = true } = options;
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn,

		onMutate: async (id) => {
			await queryClient.cancelQueries({ queryKey });
			const raw = queryClient.getQueryData(queryKey);
			const prevList = Array.isArray(raw) ? raw : [];
			const index = prevList.findIndex((item) => selectId(item) === id);
			if (index === -1) {
				return { prevList, removedItem: null, index: -1 };
			}
			const removedItem = prevList[index];
			const newData = [...prevList];
			newData.splice(index, 1);
			queryClient.setQueryData(queryKey, newData);
			return { prevList, removedItem, index };
		},

		onError: (_error, id, context) => {
			if (!context || !context.removedItem) return;
			queryClient.setQueryData(queryKey, (curr = []) => {
				const copy = [...curr];
				const safeIndex = Math.min(Math.max(context.index, 0), copy.length);
				copy.splice(safeIndex, 0, context.removedItem);
				return copy;
			});
		},
		onSuccess: () => {},

		onSettled: () => {
			if (refetchOnSettle) queryClient.invalidateQueries({ queryKey });
		},
	});
}
export default useOptimisticDelete;
