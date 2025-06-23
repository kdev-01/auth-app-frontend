import { useHover } from "@globals/hooks";
import { SidebarProvider } from "@modules/dashboard/context/SidebarContext";
import useSidebarContext from "@modules/dashboard/context/useSidebarContext";
import DashboardHeader from "../organisms/DashboardHeader";
import DashboardSidebar from "../organisms/DashboardSidebar";

function Layout() {
	const [hoverRef, isHovered] = useHover();
	const { isExpanded, isMobileOpen } = useSidebarContext();
	const sidebarOffset =
		isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]";
	const mobileOffset = isMobileOpen ? "ml-0" : "";

	return (
		<div className="min-h-screen xl:flex">
			<DashboardSidebar hoverRef={hoverRef} isHovered={isHovered} />
			<div
				className={`flex-1 transition-all duration-300 ease-in-out
					${sidebarOffset} ${mobileOffset}`}
			>
				<DashboardHeader />

				<div className="p-4 mx-auto max-w-(1536px) md:p-6"></div>
			</div>
		</div>
	);
}

function DashboardLayout() {
	return (
		<SidebarProvider>
			<Layout />
		</SidebarProvider>
	);
}

export default DashboardLayout;
