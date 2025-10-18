import useDeleteUser from "@modules/users/hooks/useDeleteUser";
import { LuPencilRuler, LuTrash } from "react-icons/lu";
import { toast } from "sonner";
import UserTableRow from "./UserTableRow";

function UserTableRowContainer({ data, confirm, onEdit }) {
	const { mutateAsync: deleteUser } = useDeleteUser();

	const handleDelete = async () => {
		const ok = await confirm({
			title: "¿Eliminar usuario?",
			description: `¿Estás seguro de eliminar a ${data.firstName} ${data.lastName}?`,
			confirmLabel: "Sí, eliminar",
		});

		if (!ok) return;

		toast.promise(deleteUser(data.id), {
			loading: "Eliminando usuario…",
			success: "Usuario eliminado correctamente.",
			error: (err) => err?.message ?? "No se pudo eliminar",
		});
	};

	const actions = [
		{ label: "Editar", onClick: () => onEdit?.(data), icon: LuPencilRuler },
		{
			label: "Eliminar",
			onClick: handleDelete,
			icon: LuTrash,
			danger: true,
		},
	];

	return <UserTableRow data={data} actions={actions} />;
}

export default UserTableRowContainer;
