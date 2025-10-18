import { genID } from "@globals/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useOptimisticAdd({
	mutationFn,
	queryKey,
	buildOptimisticItem = (v) => v,
	options = {},
}) {
	const {
		insertAt = "end",
		mergeServerItem = (optimisticItem, serverItem) => serverItem,
		refetchOnSettle = true,
	} = options;
	const queryClient = useQueryClient();
	const asList = (data) => (Array.isArray(data) ? data : []);

	return useMutation({
		mutationFn,

		onMutate: async (variables) => {
			await queryClient.cancelQueries({ queryKey });
			const optimisticItem = {
				...buildOptimisticItem(variables),
				id: genID(),
				optimisticStatus: true,
			};
			queryClient.setQueryData(queryKey, (current) => {
				const currentList = asList(current);
				if (typeof insertAt === "function")
					return insertAt(currentList, optimisticItem);
				return insertAt === "start"
					? [optimisticItem, ...currentList]
					: [...currentList, optimisticItem];
			});
			return { temporaryId: optimisticItem.id };
		},

		onError: (error, variables, context) => {
			queryClient.setQueryData(queryKey, (current) => {
				const currentList = asList(current);
				return currentList.filter((item) => item.id !== context?.temporaryId);
			});
		},

		onSuccess: (createdItem, variables, context) => {
			queryClient.setQueryData(queryKey, (current) => {
				const currentList = asList(current);
				return currentList.map((item) =>
					item.id === context?.temporaryId
						? mergeServerItem(item, createdItem)
						: item,
				);
			});
		},

		onSettled: () => {
			if (refetchOnSettle) {
				queryClient.invalidateQueries({ queryKey });
			}
		},
	});
}

export default useOptimisticAdd;
