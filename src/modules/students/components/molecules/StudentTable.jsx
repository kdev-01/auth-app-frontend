import { TableBody, TableHeader } from "@globals/components";
import { useConfirmDialog } from "@globals/hooks";
import StudentTableRow from "./StudentTableRow";

function StudentTable({ data = [], isLoading, onEditRow }) {
	const { confirm, ConfirmationUI } = useConfirmDialog();
	const columns = [
		{ id: "student", label: "Estudiante" },
		{ id: "enrolment", label: "Matrícula" },
		{ id: "gender", label: "Género" },
		{ id: "age", label: "Edad" },
		{ id: "bloodType", label: "Tipo de sangre" },
		{ id: "actions", label: "Acciones" },
	];

	return (
		<>
			<div className="overflow-x-auto rounded-lg border border-gray-200">
				<table className="min-w-full divide-y divide-gray-200">
					<TableHeader columns={columns} />
					<TableBody isLoading={isLoading} colSpan={columns.length}>
						{data.map((student) => (
							<StudentTableRow
								key={student.id}
								student={student}
								confirm={confirm}
								onEdit={onEditRow}
							/>
						))}
					</TableBody>
				</table>
			</div>
			<ConfirmationUI />
		</>
	);
}

export default StudentTable;
