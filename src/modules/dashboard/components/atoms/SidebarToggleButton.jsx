import useSidebarContext from "@modules/dashboard/context/useSidebarContext";
import { LuText, LuX } from "react-icons/lu";

function SidebarToggleButton() {
	const { isMobileOpen, toggleSidebar, toggleMobileSidebar } =
		useSidebarContext();
	const handleToggle = () => {
		if (window.innerWidth >= 1024) {
			toggleSidebar();
		} else {
			toggleMobileSidebar();
		}
	};

	return (
		<button
			type="button"
			className="cursor-pointer flex items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg lg:h-11 lg:w-11 lg:border"
			onClick={handleToggle}
		>
			{isMobileOpen ? <LuX /> : <LuText />}
		</button>
	);
}

export default SidebarToggleButton;
