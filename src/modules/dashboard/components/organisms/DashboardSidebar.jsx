import useSidebarContext from "@modules/dashboard/context/useSidebarContext";
import SidebarNav from "./SidebarNav";
import SidebarWrapper from "./SidebarWrapper";

function DashboardSidebar({ hoverRef, isHovered }) {
	const { isExpanded, isMobileOpen } = useSidebarContext();
	const visible = isExpanded || isHovered || isMobileOpen;

	return (
		<>
			<SidebarWrapper
				isHovered={isHovered}
				hoverRef={hoverRef}
				visible={visible}
			>
				<SidebarNav isHovered={isHovered} visible={visible} />
			</SidebarWrapper>
		</>
	);
}

export default DashboardSidebar;
