import { ActionsMenu, Avatar } from "@globals/components";
import { calculateAge } from "@globals/utils";
import useDeleteStudent from "@modules/students/hooks/useDeleteStudent";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { toast } from "sonner";

function StudentTableRow({ student, onEdit, confirm }) {
	const age = calculateAge(student.dateOfBirth);
	const { mutateAsync: deleteStudent } = useDeleteStudent();

	const handleDelete = async () => {
		const ok = await confirm({
			title: "¿Eliminar estudiante?",
			description: `Se eliminará a ${student.firstName} ${student.lastName} del sistema.`,
			confirmLabel: "Sí, eliminar",
		});

		if (!ok) return;

		toast.promise(deleteStudent(student.id), {
			loading: "Eliminando estudiante...",
			success: (data) => {
				return data?.message ?? "Estudiante eliminado con éxito!";
			},
			error: (err) => {
				return err?.message ?? "No se pudo eliminar el estudiante";
			},
		});
	};

	const actions = [
		{
			label: "Editar",
			icon: LuPencil,
			onClick: () => onEdit(student),
		},
		{
			label: "Eliminar",
			icon: LuTrash2,
			onClick: handleDelete,
			danger: true,
		},
	];

	return (
		<tr className="border-b hover:bg-gray-50">
			<td className="px-4 py-3">
				<div className="flex items-center gap-3">
					<Avatar src={student.url} alt={student.firstName} />
					<div>
						<p className="font-medium text-gray-900">
							{student.firstName} {student.lastName}
						</p>
						<p className="text-xs text-gray-500">{student.nationalID}</p>
					</div>
				</div>
			</td>
			<td className="px-4 py-3 text-sm text-gray-700">
				<p>{student.enrolmentNum}</p>
			</td>
			<td className="px-4 py-3 text-sm text-gray-700">
				<p>{student.gender}</p>
			</td>
			<td className="px-4 py-3 text-sm text-gray-700">
				<p>{age} años</p>
			</td>
			<td className="px-4 py-3 text-sm text-gray-700">
				<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
					{student.bloodType}
				</span>
			</td>
			<td className="px-4 py-3">
				<ActionsMenu actions={actions} />
			</td>
		</tr>
	);
}

export default StudentTableRow;
