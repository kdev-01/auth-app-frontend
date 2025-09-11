import { ActionsMenu, StatusBadge } from "@globals/components";
import useDeleteUser from "@modules/users/hooks/useDeleteUser";
import { LuPencilRuler, LuTrash } from "react-icons/lu";
import { toast } from "sonner";
import UserInfo from "./UserInfo";

function UserTableRow({ data, confirm }) {
	const mutedTextClass = "text-gray-400";
	const isNilOrEmpty = (value) => value == null || value === "";
	const getMutedClassIfEmpty = (value) =>
		isNilOrEmpty(value) ? mutedTextClass : "";
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

	const handleEdit = () => {
		console.log("Editar", data.id);
	};

	return (
		<tr className="text-gray-800 text-sm">
			<td className="px-5 py-4">
				<UserInfo
					photo_url={data.url}
					first_name={data.firstName}
					last_name={data.lastName}
					role_name={data.email}
				/>
			</td>
			<td className={`px-5 py-4 ${getMutedClassIfEmpty(data.nationalID)}`}>
				{data.nationalID || "Sin registrar"}
			</td>
			<td className="px-5 py-4">
				<div className="flex flex-col">
					{data.role}
					{data.institution ? (
						<span className="text-xs text-blue-400">{data.institution}</span>
					) : (
						""
					)}
				</div>
			</td>
			<td className={`px-5 py-4 ${getMutedClassIfEmpty(data.phone)}`}>
				{data.phone || "Sin registrar"}
			</td>
			<td className="px-5 py-4 text-xs">
				<StatusBadge isActive={data.status} />
			</td>
			<td className="px-5 py-4">
				<ActionsMenu
					actions={[
						{ label: "Editar", onClick: handleEdit, icon: LuPencilRuler },
						{
							label: "Eliminar",
							onClick: handleDelete,
							icon: LuTrash,
							danger: true,
						},
					]}
				/>
			</td>
		</tr>
	);
}

export default UserTableRow;
