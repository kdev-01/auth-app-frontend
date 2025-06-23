import useSidebarContext from "@modules/dashboard/context/useSidebarContext";
import { LuCircleUser, LuLayoutGrid } from "react-icons/lu";
import SidebarNav from "./SidebarNav";
import SidebarWrapper from "./SidebarWrapper";

function DashboardSidebar({ hoverRef, isHovered }) {
	const { isExpanded, isMobileOpen } = useSidebarContext();
	const visible = isExpanded || isHovered || isMobileOpen;

	const navItems = [
		{
			name: "Inicio",
			path: "/",
			icon: <LuLayoutGrid className="!w-6 !h-6" />,
		},
		{
			name: "Usuarios",
			path: "/users",
			icon: <LuCircleUser className="!w-6 !h-6" />,
			subItems: [{ name: "Usuarios nuevos", path: "/users/new" }],
		},
		{
			name: "Estudiantes",
			path: "/users/new",
			icon: <LuCircleUser className="!w-6 !h-6" />,
			subItems: [{ name: "Usuarios nuevos", path: "/users/new" }],
		},
		{
			name: "Estudiantes",
			path: "/users/new/otro",
			icon: <LuCircleUser className="!w-6 !h-6" />,
			subItems: [{ name: "Usuarios nuevos", path: "/users/new" }],
		},
	];

	return (
		<>
			<SidebarWrapper
				isHovered={isHovered}
				hoverRef={hoverRef}
				visible={visible}
			>
				<SidebarNav
					navItems={navItems}
					isHovered={isHovered}
					visible={visible}
				/>
			</SidebarWrapper>
		</>
	);
}

export default DashboardSidebar;
