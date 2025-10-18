import { useEffect } from "react";

function useEscapeKey(callback, enabled = true) {
	useEffect(() => {
		if (!enabled) return;

		const handleKey = (e) => {
			if (e.key === "Escape") callback?.();
		};

		document.addEventListener("keydown", handleKey);
		return () => document.removeEventListener("keydown", handleKey);
	}, [callback, enabled]);
}

export default useEscapeKey;
