import { useEffect, useId, useRef, useState } from "react";
import useClickOutside from "./useClickOutside";
import useDropdownPosition from "./useDropdownPosition";

function useFloatingMenu({ offsetX = 0, offsetY = 0 } = {}) {
	const [open, setOpen] = useState(false);
	const triggerRef = useRef(null);
	const contentRef = useRef(null);
	const id = useId();

	const position = useDropdownPosition(triggerRef, open, {
		x: offsetX,
		y: offsetY,
	});

	useClickOutside(contentRef, () => setOpen(false));

	useEffect(() => {
		if (!open) return;

		const handleClose = () => setOpen(false);

		document.addEventListener("scroll", handleClose, true);
		window.addEventListener("wheel", handleClose, { passive: true });
		window.addEventListener("touchstart", handleClose, { passive: true });

		return () => {
			document.removeEventListener("scroll", handleClose, true);
			window.removeEventListener("wheel", handleClose);
			window.removeEventListener("touchstart", handleClose);
		};
	}, [open]);

	const toggle = () => setOpen((prev) => !prev);
	const close = () => setOpen(false);

	return {
		open,
		toggle,
		close,
		triggerRef,
		contentRef,
		position,
		id,
	};
}

export default useFloatingMenu;
