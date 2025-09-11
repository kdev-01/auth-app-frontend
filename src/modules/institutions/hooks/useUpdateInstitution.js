import { useOptimisticUpdate } from "@globals/hooks";
import { updateInstitution } from "../services/institutionService";

function useUpdateInstitution() {
	return useOptimisticUpdate({
		queryKey: ["institutions"],
		mutationFn: updateInstitution,
		selectId: (item) => item.id,
		applyUpdate: (item, patch) => ({
			...item,
			...patch,
			isActive: patch.status ? patch.status === "affiliated" : item.isActive,
		}),
		options: {
			refetchOnSettle: true,
			mergeServerItem: (optimistic, server) => ({
				...optimistic,
				...server,
				optimisticStatus: false,
			}),
		},
	});
}

export default useUpdateInstitution;
