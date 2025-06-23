import { useMobile } from "@globals/hooks";
import { createContext, useState } from "react";
const SidebarContext = createContext();

function SidebarProvider({ children }) {
	const [isExpanded, setIsExpanded] = useState(true);
	const [isMobileOpen, setIsMobileOpen] = useState(false);

	const toggleSidebar = () => setIsExpanded((prev) => !prev);
	const toggleMobileSidebar = () => setIsMobileOpen((prev) => !prev);

	const isMobile = useMobile();
	const value = {
		isExpanded: isMobile ? false : isExpanded,
		isMobileOpen,
		toggleSidebar,
		toggleMobileSidebar,
	};

	return (
		<SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
	);
}

export { SidebarContext, SidebarProvider };
