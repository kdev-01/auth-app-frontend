import { TableBody, TableHeader } from "@globals/components";
import { useConfirmDialog } from "@globals/hooks";
import { userTableHeaders } from "@modules/users/data/userDataTable";
import UserTableRow from "./UserTableRow";

function UserTable({ data = [], isLoading }) {
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
						<UserTableRow {...props} confirm={confirm} />
					)}
				/>
			</table>

			<ConfirmationUI />
		</div>
	);
}

export default UserTable;
