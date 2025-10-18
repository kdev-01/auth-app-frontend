import useSidebarContext from "@modules/dashboard/context/useSidebarContext";
import SidebarTitle from "../atoms/SidebarTitle";
import SidebarHeader from "../molecules/SidebarHeader";

function SidebarWrapper({ isHovered, hoverRef, visible, children }) {
	const { isExpanded, isMobileOpen } = useSidebarContext();
	const sidebarWidthClass = visible ? "w-[290px]" : "w-[90px]";
	const isSidebarCollapsed = !isExpanded && !isHovered;

	const mobileVisibilityClass = isMobileOpen
		? "translate-x-0"
		: "-translate-x-full";

	return (
		<aside
			ref={hoverRef}
			className={`
                h-screen fixed flex flex-col gap-8
                mt-16 lg:mt-0 top-0 px-5 left-0
                bg-white border-r text-gray-600 border-gray-200
                transition-all duration-300 ease-in-out z-50
                ${sidebarWidthClass} ${mobileVisibilityClass}
                lg:translate-x-0
            `}
		>
			<SidebarHeader
				isSidebarCollapsed={isSidebarCollapsed}
				visible={visible}
			/>

			<section className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
				<SidebarTitle
					isSidebarCollapsed={isSidebarCollapsed}
					visible={visible}
				/>
				{children}
			</section>
		</aside>
	);
}

export default SidebarWrapper;
