import { FilterButton, TableToolbar } from "@globals/components";
import {
	useApiQuery,
	useFilters,
	useMergedConfig,
	useSearchFilter,
} from "@globals/hooks";
import { normalizeFilterOptions } from "@globals/utils";
import DashboardContent from "@modules/dashboard/components/molecules/DashboardContent";
import UpdateUserModal from "@modules/users/components/organisms/UpdateUserModal";
import { useState } from "react";
import { LuUserRoundPlus } from "react-icons/lu";
import UserTable from "../components/molecules/UserTable";
import InviteUserModal from "../components/organisms/InviteUserModal";
import { userFiltersConfig } from "../data/userFiltersConfig";
import { getAllRoles, getAllUsers } from "../services/userService";
import { mapUsers } from "../utils/mappers";

function UserManagement() {
	// Modal states
	const [modalOpen, setModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [editingItem, setEditingItem] = useState(null);

	// Principal queries
	const { data: users = [], isLoading } = useApiQuery({
		key: ["users"],
		queryFn: getAllUsers,
		time: 5,
		select: mapUsers,
	});

	// Secondary queries
	const { data: roles = [] } = useApiQuery({
		key: ["roles"],
		queryFn: getAllRoles,
		time: 10,
		select: normalizeFilterOptions,
	});

	// Enrich filter config
	const filterConfig = useMergedConfig(userFiltersConfig, {
		role: roles,
	});

	// Filters
	const {
		filters,
		setFilter,
		filteredItems: filteredByFilters,
		activeCount,
	} = useFilters(users, filterConfig, {
		role: new Set(),
		deleted: "exclude",
	});

	// Search
	const { search, setSearch, filteredItems } = useSearchFilter(
		filteredByFilters,
		(user) =>
			`${user.firstName} ${user.lastName} ${user.nationalID} ${user.email}`,
	);

	const handleEditRow = (row) => {
		console.log("Editar", row);
		setEditingItem(row);
		setEditModalOpen(true);
	};

	return (
		<>
			<DashboardContent
				heading={
					<TableToolbar
						name="Buscar usuario"
						placeholder="Buscar por nombre, cédula o email"
						search={search}
						setSearch={setSearch}
						openModal={() => setModalOpen(true)}
						icon={LuUserRoundPlus}
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
				{users.length > 0 ? (
					<UserTable
						data={filteredItems}
						isLoading={isLoading}
						onEditRow={handleEditRow}
					/>
				) : (
					<p className="py-4 text-center text-gray-500">
						No hay usuarios registrados.
					</p>
				)}
			</DashboardContent>

			<InviteUserModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

			<UpdateUserModal
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

export default UserManagement;
