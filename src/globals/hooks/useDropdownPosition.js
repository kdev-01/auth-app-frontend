import { useEffect, useState } from "react";

function useDropdownPosition(triggerRef, open, offset = { x: 0, y: 0 }) {
	const [position, setPosition] = useState({ top: 0, left: 0 });

	useEffect(() => {
		if (open && triggerRef.current) {
			const rect = triggerRef.current.getBoundingClientRect();
			setPosition({
				top: rect.bottom + window.scrollY + offset.y,
				left: rect.right + window.scrollX + offset.x,
			});
		}
	}, [open, triggerRef, offset.x, offset.y]);

	return position;
}

export default useDropdownPosition;
