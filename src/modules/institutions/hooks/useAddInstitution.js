import { useOptimisticAdd } from "@globals/hooks";
import { createInstitution } from "../services/institutionService";

const todayYMD = (tz = "America/Guayaquil") =>
	new Intl.DateTimeFormat("en-CA", {
		timeZone: tz,
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	}).format(new Date());

function useAddInstitution() {
	return useOptimisticAdd({
		queryKey: ["institutions"],
		mutationFn: createInstitution,
		buildOptimisticItem: (formValues) => ({
			...formValues,
			status: "Afiliado",
			isActive: true,
			affiliatedAt: todayYMD(),
			occurredAt: null,
		}),
		options: {
			insertAt: "end",
			refetchOnSettle: true,
		},
	});
}

export default useAddInstitution;
