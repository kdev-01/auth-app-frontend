import { useOptimisticDelete } from "@globals/hooks";
import { deleteUser } from "../services/userService";

function useDeleteUser() {
	return useOptimisticDelete({
		queryKey: ["users"],
		mutationFn: (id) => deleteUser(id),
		options: { refetchOnSettle: true },
	});
}

export default useDeleteUser;
