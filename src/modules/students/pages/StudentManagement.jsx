import { FilterButton } from "@globals/components";
import { useApiQuery, useFilters, useSearchFilter } from "@globals/hooks";
import DashboardContent from "@modules/dashboard/components/molecules/DashboardContent";
import TableToolbar from "@globals/components/molecules/TableToolbar";
import { useState } from "react";
import { LuUserPlus } from "react-icons/lu";
import StudentTable from "../components/molecules/StudentTable";
import AddStudentModal from "../components/organisms/AddStudentModal";
import UpdateStudentModal from "../components/organisms/UpdateStudentModal";
import { studentFiltersConfig } from "../data/studentFiltersConfig";
import { getAllStudents } from "../services/studentService";
import { mapStudents } from "../utils/mappers";

function StudentManagement() {
	const [modalOpen, setModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [editingItem, setEditingItem] = useState(null);

	const { data: students = [], isLoading } = useApiQuery({
		key: ["students"],
		queryFn: getAllStudents,
		select: mapStudents,
	});

	const {
		filters,
		setFilter,
		filteredItems: filteredByFilters,
		activeCount,
	} = useFilters(students, studentFiltersConfig, {
		bloodType: new Set(),
		gender: new Set(),
		deleted: "exclude",
	});

	const { search, setSearch, filteredItems } = useSearchFilter(
		filteredByFilters,
		(student) =>
			`${student.firstName} ${student.lastName} ${student.nationalID} ${student.enrolmentNum}`,
	);

	const handleEditRow = (row) => {
		setEditingItem(row);
		setEditModalOpen(true);
	};

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
						icon={LuUserPlus}
						filterButton={
							<FilterButton
								config={studentFiltersConfig}
								value={filters}
								onChange={(newFilters) => {
									Object.entries(newFilters).forEach(([key, value]) => {
										setFilter(key, value);
									});
								}}
								badge={activeCount}
							/>
						}
					/>
				}
			>
				{students.length > 0 ? (
					<StudentTable
						data={filteredItems}
						isLoading={isLoading}
						onEditRow={handleEditRow}
					/>
				) : (
					<p className="py-4 text-center text-gray-500">
						No hay estudiantes registrados.
					</p>
				)}
			</DashboardContent>

			<AddStudentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

			<UpdateStudentModal
				isOpen={editModalOpen}
				onClose={() => {
					setEditModalOpen(false);
					setEditingItem(null);
				}}
				initialData={editingItem}
			/>
		</>
	);
}

export default StudentManagement;
