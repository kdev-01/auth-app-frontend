import { ActionsMenu, StatusBadge } from "@globals/components";
import { formatDate } from "@globals/utils";

function InstitutionTableRow({ data, actions }) {
	return (
		<tr className={"text-gray-800 text-sm"}>
			<td className="px-5 py-4">{data.name}</td>
			<td className="px-5 py-4">{data.city}</td>
			<td className="px-5 py-4 flex">
				<StatusBadge isActive={data.isActive}>
					{`${data.status} el ${data.occurredAt ? formatDate("long", data.occurredAt) : formatDate("long", data.affiliatedAt)}`}
				</StatusBadge>
			</td>
			<td className="px-5 py-4">
				<ActionsMenu actions={actions} />
			</td>
		</tr>
	);
}

export default InstitutionTableRow;
