import { ActionsMenu, StatusBadge } from "@globals/components";
import { getMutedClass } from "@globals/utils";
import UserInfo from "../molecules/UserInfo";

function UserTableRow({ data, actions }) {
	return (
		<tr className="text-gray-800 text-sm">
			<td className="px-5 py-4">
				<UserInfo
					photo_url={data.url}
					first_name={data.firstName}
					last_name={data.lastName}
					role_name={data.email}
				/>
			</td>
			<td className={`px-5 py-4 ${getMutedClass(data.nationalID)}`}>
				{data.nationalID || "Sin registrar"}
			</td>
			<td className="px-5 py-4">
				<div className="flex flex-col">
					{data.role}
					{data.institution ? (
						<span className="text-xs text-blue-400">{data.institution}</span>
					) : (
						""
					)}
				</div>
			</td>
			<td className={`px-5 py-4 ${getMutedClass(data.phone)}`}>
				{data.phone || "Sin registrar"}
			</td>
			<td className="px-5 py-4 text-xs">
				<StatusBadge isActive={data.status} />
			</td>
			<td className="px-5 py-4">
				<ActionsMenu actions={actions} />
			</td>
		</tr>
	);
}

export default UserTableRow;
