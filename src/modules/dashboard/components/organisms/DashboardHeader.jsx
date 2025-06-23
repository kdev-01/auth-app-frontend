import SidebarToggleButton from "../atoms/SidebarToggleButton";

function DashboardHeader() {
	return (
		<header className="sticky top-0 flex items-center justify-between px-5 py-3 w-full bg-white border-gray-200 lg:border-b z-10">
			<SidebarToggleButton />
		</header>
	);
}

export default DashboardHeader;
