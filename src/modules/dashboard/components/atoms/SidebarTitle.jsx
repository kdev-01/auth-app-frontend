import { BiDotsHorizontalRounded } from "react-icons/bi";

function SidebarTitle({ isSidebarCollapsed, visible }) {
	return (
		<h2
			className={`text-xs uppercase flex text-gray-400 mb-5 ${
				isSidebarCollapsed ? "lg:justify-center" : "justify-start"
			}`}
		>
			{visible ? "Menú" : <BiDotsHorizontalRounded className="size-6" />}
		</h2>
	);
}

export default SidebarTitle;
