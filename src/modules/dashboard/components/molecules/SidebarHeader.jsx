import { ImageLink } from "@globals/components";
import logo from "/Logo.png";

function SidebarHeader({ isSidebarCollapsed, visible }) {
	return (
		<section
			className={`flex items-center gap-2 mt-4 ${
				isSidebarCollapsed ? "lg:justify-center" : "justify-start"
			}`}
		>
			<ImageLink to="/" src={logo} alt="Logo FDPEN" className="w-14" />
			{visible && <h1>Federación de Napo</h1>}
		</section>
	);
}

export default SidebarHeader;
