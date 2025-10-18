import { useMutation, useQueryClient } from "@tanstack/react-query";

function useOptimisticUpdate({
	mutationFn,
	queryKey,
	selectId = (item) => item.id,
	applyUpdate = (item, variables) => ({ ...item, ...variables }),
	options = {},
}) {
	const {
		refetchOnSettle = true,
		mergeServerItem = (optimisticItem, serverItem) => serverItem,
	} = options;

	const queryClient = useQueryClient();
	const asList = (data) => (Array.isArray(data) ? data : []);

	return useMutation({
		mutationFn,

		onMutate: async (variables) => {
			await queryClient.cancelQueries({ queryKey });

			const prevList = queryClient.getQueryData(queryKey) ?? [];
			const list = asList(prevList);
			const idToUpdate = variables?.id ?? variables?.Id ?? variables?.ID;
			const index = list.findIndex((it) => selectId(it) === idToUpdate);

			if (index === -1) {
				return { prevList, index: -1, prevItem: null };
			}

			const prevItem = list[index];
			const patched = applyUpdate(prevItem, variables);
			const nextList = [...list];
			nextList[index] = { ...patched, optimisticStatus: true };

			queryClient.setQueryData(queryKey, nextList);

			return { prevList, index, prevItem };
		},

		onError: (_error, _variables, context) => {
			if (!context) return;
			queryClient.setQueryData(queryKey, context.prevList);
		},

		onSuccess: (serverItem, variables, context) => {
			queryClient.setQueryData(queryKey, (current) => {
				const list = asList(current);
				if (!context || context.index === -1) return list;
				const idToUpdate = variables?.id ?? variables?.Id ?? variables?.ID;

				return list.map((it) =>
					selectId(it) === idToUpdate ? mergeServerItem(it, serverItem) : it,
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

export default useOptimisticUpdate;
