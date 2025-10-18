import { FilterButton, TableToolbar } from "@globals/components";
import {
	useApiQuery,
	useFilters,
	useMergedConfig,
	useSearchFilter,
} from "@globals/hooks";
import { normalizeFilterOptions } from "@globals/utils";
import { DashboardContent } from "@modules/dashboard/components/molecules";
import { useState } from "react";
import { LuHousePlus } from "react-icons/lu";
import InstitutionTable from "../components/molecules/InstitutionTable";
import AddInstitutionModal from "../components/organisms/AddInstitutionModal";
import UpdateInstitutionModal from "../components/organisms/UpdateInstitutionModal";
import { institutionFiltersConfig } from "../data/institutionFiltersConfig";
import {
	getAllCities,
	getAllInstitutions,
} from "../services/institutionService";
import { mapInstitutions } from "../utils/mappers";

function InstitutionManagement() {
	// Modal states
	const [modalOpen, setModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [editingItem, setEditingItem] = useState(null);

	// Principal queries
	const { data: institutions = [], isLoading } = useApiQuery({
		key: ["institutions"],
		queryFn: getAllInstitutions,
		time: 5,
		select: mapInstitutions,
	});

	// Secondary queries
	const { data: cities = [] } = useApiQuery({
		key: ["cities"],
		queryFn: getAllCities,
		time: 10,
		select: normalizeFilterOptions,
	});

	// Enrich filter config
	const filterConfig = useMergedConfig(institutionFiltersConfig, {
		city: cities,
	});

	// Filters
	const {
		filters,
		setFilter,
		filteredItems: filteredByFilters,
		activeCount,
	} = useFilters(institutions, filterConfig, {
		city: new Set(),
		status: new Set(),
		deleted: "exclude",
	});

	// Search
	const { search, setSearch, filteredItems } = useSearchFilter(
		filteredByFilters,
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
						filterButton={
							<FilterButton
								config={filterConfig}
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
				{institutions.length > 0 ? (
					<InstitutionTable
						data={filteredItems}
						isLoading={isLoading}
						onEditRow={handleEditRow}
					/>
				) : (
					<p className="py-4 text-center text-gray-500">
						No hay instituticiones educativas registradas.
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
