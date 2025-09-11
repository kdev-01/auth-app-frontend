import { Avatar } from "@globals/components";

function UserInfo({ photo_url, first_name, last_name, role_name }) {
	return (
		<div className="flex gap-2 items-center">
			<Avatar src={photo_url} alt={`Foto de ${first_name}`} />
			<div>
				<span className="block font-medium">
					{first_name} {last_name}
				</span>
				{role_name && (
					<span className="block text-gray-500 text-xs">{role_name}</span>
				)}
			</div>
		</div>
	);
}

export default UserInfo;
