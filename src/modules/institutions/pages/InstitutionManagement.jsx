import { useApiQuery, useSearchFilter } from "@globals/hooks";
import DashboardContent from "@modules/dashboard/components/molecules/DashboardContent";
import TableToolbar from "@modules/users/components/molecules/TableToolbar";
import { useState } from "react";
import { LuHousePlus } from "react-icons/lu";
import InstitutionTable from "../components/molecules/InstitutionTable";
import AddInstitutionModal from "../components/organisms/AddInstitutionModal";
import UpdateInstitutionModal from "../components/organisms/UpdateInstitutionModal";
import { getAllInstitutions } from "../services/institutionService";
import { mapAllInstitutions } from "../utils/mappers";

function InstitutionManagement() {
	const [modalOpen, setModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [editingItem, setEditingItem] = useState(null);

	const { data: institutions = [], isLoading } = useApiQuery({
		key: ["institutions"],
		queryFn: getAllInstitutions,
		select: mapAllInstitutions,
	});

	const { search, setSearch, filteredItems } = useSearchFilter(
		institutions,
		(institution) => `${institution.name}`,
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
						name="Buscar unidad educativa"
						placeholder="Buscar por nombre"
						search={search}
						setSearch={setSearch}
						openModal={() => setModalOpen(true)}
						icon={LuHousePlus}
					/>
				}
			>
				{institutions.length > 0 ? (
					<InstitutionTable
						data={filteredItems}
						isLoading={isLoading}
						onEditRow={handleEditRow}
					/>
				) : (
					<p className="py-4 text-center text-gray-500">
						No hay instituticiones educativas.
					</p>
				)}
			</DashboardContent>

			<AddInstitutionModal
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
			/>

			<UpdateInstitutionModal
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

export default InstitutionManagement;
