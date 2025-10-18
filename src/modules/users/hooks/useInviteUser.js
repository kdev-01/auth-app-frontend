import { useOptimisticAdd } from "@globals/hooks";
import { inviteUser } from "../services/userService";

function useInviteUser() {
	return useOptimisticAdd({
		queryKey: ["users"],
		mutationFn: inviteUser,
		buildOptimisticItem: (formValues) => ({
			...formValues,
		}),
		options: {
			insertAt: "end",
			refetchOnSettle: true,
		},
	});
}

export default useInviteUser;
