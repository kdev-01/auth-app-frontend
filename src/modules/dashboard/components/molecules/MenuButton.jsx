import ChevronIcon from "../atoms/ChevronIcon";
import Icon from "../atoms/Icon";
import TextLabel from "../atoms/TextLabel";

function MenuButton({ onClick, isOpen, icon, label, visible }) {
	return (
		<button
			onClick={onClick}
			className={`flex items-center w-full gap-3 px-3 py-2 rounded-lg font-medium cursor-pointer ${
				isOpen ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100"
			}`}
		>
			<Icon icon={icon} />
			<TextLabel show={visible}>{label}</TextLabel>
			{visible && <ChevronIcon isOpen={isOpen} />}
		</button>
	);
}

export default MenuButton;
