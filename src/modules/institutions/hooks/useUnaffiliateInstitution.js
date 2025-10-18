import { useOptimisticDelete } from "@globals/hooks";
import { unaffiliateInstitution } from "../services/institutionService";

function useUnaffiliateInstitution() {
	return useOptimisticDelete({
		queryKey: ["institutions"],
		mutationFn: (id) => unaffiliateInstitution(id),
		options: { refetchOnSettle: true },
	});
}

export default useUnaffiliateInstitution;
