import { useApiQuery, useSearchFilter } from "@globals/hooks";
import DashboardContent from "@modules/dashboard/components/molecules/DashboardContent";
import { useState } from "react";
import { LuUserRoundPlus } from "react-icons/lu";
import TableToolbar from "../components/molecules/TableToolbar";
import UserTable from "../components/molecules/UserTable";
import InviteUserModal from "../components/organisms/InviteUserModal";
import { getAllUsers } from "../services/userService";
import { mapAllUsers } from "../utils/mappers";

function UserManagement() {
	const [modalOpen, setModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [editingItem, setEditingItem] = useState(null);

	const { data: users = [], isLoading } = useApiQuery({
		key: ["users"],
		queryFn: getAllUsers,
		select: mapAllUsers,
	});

	const { search, setSearch, filteredItems } = useSearchFilter(
		users,
		(user) =>
			`${user.firstName} ${user.lastName} ${user.nationalID} ${user.email}`,
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
						name="Buscar usuario"
						placeholder="Buscar por nombre, cédula o email"
						search={search}
						setSearch={setSearch}
						openModal={() => setModalOpen(true)}
						icon={LuUserRoundPlus}
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
					<p className="py-4 text-center text-gray-500">No hay usuarios.</p>
				)}
			</DashboardContent>

			<InviteUserModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
		</>
	);
}

export default UserManagement;
