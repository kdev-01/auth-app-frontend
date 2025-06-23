import { useContext } from "react";
import { SidebarContext } from "./SidebarContext";

export default function useSidebarContext() {
	const context = useContext(SidebarContext);
	if (!context) {
		throw new Error("useSidebarContext debe usarse dentro de SidebarProvider");
	}
	return context;
}
