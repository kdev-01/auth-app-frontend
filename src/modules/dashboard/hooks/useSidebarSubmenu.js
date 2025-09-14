import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

function useSidebarSubmenu(navItems) {
	const location = useLocation();
	const [openSubmenu, setOpenSubmenu] = useState(null);
	const [subMenuHeight, setSubMenuHeight] = useState({});
	const subMenuRefs = useRef({});

	useEffect(() => {
		const index = navItems.findIndex((item) =>
			(item.children || []).some((sub) => sub.path === location.pathname),
		);
		setOpenSubmenu(index !== -1 ? index : null);
	}, [location.pathname]);

	useEffect(() => {
		if (openSubmenu === null) return;
		const ref = subMenuRefs.current[openSubmenu];
		if (ref) {
			setSubMenuHeight((prevHeights) => ({
				...prevHeights,
				[openSubmenu]: ref.scrollHeight,
			}));
		}
	}, [openSubmenu]);

	const toggleSubmenu = (index) => {
		setOpenSubmenu((prev) => (prev === index ? null : index));
	};

	return {
		openSubmenu,
		toggleSubmenu,
		subMenuHeight,
		subMenuRefs,
	};
}

export default useSidebarSubmenu;
