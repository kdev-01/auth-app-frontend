import { useOptimisticAdd } from "@globals/hooks";
import { createStudent } from "../services/studentService";

function useAddStudent() {
	return useOptimisticAdd({
		queryKey: ["students"],
		mutationFn: createStudent,
		buildOptimisticItem: (formValues) => ({
			...formValues,
			status: false,
		}),
		options: {
			insertAt: "end",
			refetchOnSettle: true,
		},
	});
}

export default useAddStudent;
