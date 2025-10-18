import { TableBody, TableHeader } from "@globals/components";
import { useConfirmDialog } from "@globals/hooks";
import { userTableHeaders } from "@modules/users/data/userDataTable";
import UserTableRowContainer from "../organisms/UserTableRowContainer";

function UserTable({ data = [], isLoading, onEditRow }) {
	const { confirm, ConfirmationUI } = useConfirmDialog();

	return (
		<div className="rounded-xl border border-gray-200 overflow-x-auto">
			<table className="min-w-full">
				<TableHeader columns={userTableHeaders} />
				<TableBody
					data={data}
					isLoading={isLoading}
					colSpan={userTableHeaders.length}
					RowComponent={(props) => (
						<UserTableRowContainer
							{...props}
							confirm={confirm}
							onEdit={onEditRow}
						/>
					)}
				/>
			</table>

			<ConfirmationUI />
		</div>
	);
}

export default UserTable;
