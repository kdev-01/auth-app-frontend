import { useOptimisticDelete } from "@globals/hooks";
import { deleteStudent } from "../services/studentService";

function useDeleteStudent() {
	return useOptimisticDelete({
		queryKey: ["students"],
		mutationFn: deleteStudent,
	});
}

export default useDeleteStudent;
