import { useEffect } from "react";

function useBodyScrollLock(enabled = true) {
	useEffect(() => {
		if (!enabled) return;

		const originalStyle = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = originalStyle;
		};
	}, [enabled]);
}

export default useBodyScrollLock;
