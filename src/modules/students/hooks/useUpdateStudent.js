import { useOptimisticUpdate } from "@globals/hooks";
import { updateStudent } from "../services/studentService";

function useUpdateStudent() {
	return useOptimisticUpdate({
		queryKey: ["students"],
		mutationFn: updateStudent,
	});
}

export default useUpdateStudent;
