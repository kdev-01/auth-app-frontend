import { useApiQuery, useSearchFilter } from "@globals/hooks";
import DashboardContent from "@modules/dashboard/components/molecules/DashboardContent";
import TableToolbar from "@modules/users/components/molecules/TableToolbar";
import { useState } from "react";
import { LuCross } from "react-icons/lu";
import StudentCardList from "../components/StudentCardList";
import { getAllStudents } from "../services/studentService";
import { mapStudents } from "../utils/mappers";

function StudentManagement() {
	const [modalOpen, setModalOpen] = useState(false);

	const { data: students = [], isLoading } = useApiQuery({
		key: ["students"],
		queryFn: getAllStudents,
		select: mapStudents,
	});

	const { search, setSearch, filteredItems } = useSearchFilter(
		students,
		(student) =>
			`${student.firstName} ${student.lastName} ${student.nationalID} ${student.enrolmentNum}`,
	);

	return (
		<>
			<DashboardContent
				heading={
					<TableToolbar
						name="Buscar estudiante"
						placeholder="Buscar por nombre, cédula o matrícula"
						search={search}
						setSearch={setSearch}
						openModal={() => setModalOpen(true)}
						icon={LuCross}
					/>
				}
			>
				{students.length > 0 ? (
					<StudentCardList data={filteredItems} isLoading={isLoading} />
				) : (
					<p className="py-4 text-center text-gray-500">
						No hay estudiantes registrados.
					</p>
				)}
			</DashboardContent>
		</>
	);
}

export default StudentManagement;
