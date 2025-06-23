import { Link } from "react-router-dom";
import Icon from "../atoms/Icon";
import TextLabel from "../atoms/TextLabel";

function MenuLink({ to, active, icon, label, visible }) {
	return (
		<Link
			to={to}
			className={`flex items-center w-full gap-3 px-3 py-2 rounded-lg font-medium ${
				active ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100"
			}`}
		>
			<Icon icon={icon} />
			<TextLabel show={visible}>{label}</TextLabel>
		</Link>
	);
}

export default MenuLink;
