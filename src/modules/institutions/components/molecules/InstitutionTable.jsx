import { TableBody, TableHeader } from "@globals/components";
import { useConfirmDialog } from "@globals/hooks";
import { institutionTableHeaders } from "@modules/institutions/data/institutionDataTable";
import InstitutionTableRowContainer from "../organisms/InstitutionTableRowContainer";

function InstitutionTable({ data = [], isLoading, onEditRow }) {
	const { confirm, ConfirmationUI } = useConfirmDialog();

	return (
		<div className="rounded-xl border border-gray-200 overflow-x-auto">
			<table className="min-w-full">
				<TableHeader columns={institutionTableHeaders} />
				<TableBody
					data={data}
					isLoading={isLoading}
					colSpan={institutionTableHeaders.length}
					RowComponent={(props) => (
						<InstitutionTableRowContainer
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

export default InstitutionTable;
