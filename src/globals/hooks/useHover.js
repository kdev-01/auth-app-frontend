import { useEffect, useRef, useState } from "react";

function useHover() {
	const [isHovered, setIsHovered] = useState(false);
	const ref = useRef(null);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		const onEnter = () => setIsHovered(true);
		const onLeave = () => setIsHovered(false);

		node.addEventListener("mouseenter", onEnter);
		node.addEventListener("mouseleave", onLeave);
		return () => {
			node.removeEventListener("mouseenter", onEnter);
			node.removeEventListener("mouseleave", onLeave);
		};
	}, [ref]);

	return [ref, isHovered];
}

export default useHover;
