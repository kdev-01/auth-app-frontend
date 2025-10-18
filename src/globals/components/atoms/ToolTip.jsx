import { useId, useState } from "react";

function ToolTip({ children, label }) {
	const [isVisible, setIsVisible] = useState(false);
	const id = useId();

	return (
		<span
			className="relative inline-flex"
			onMouseEnter={() => setIsVisible(true)}
			onMouseLeave={() => setIsVisible(false)}
			onFocus={() => setIsVisible(true)}
			onBlur={() => setIsVisible(false)}
			aria-describedby={id}
		>
			{children}
			<span
				id={id}
				role="tooltip"
				className={`absolute z-20 top-[-2.25rem] left-1/2 -translate-x-1/2
					rounded-md bg-gray-800 text-white text-xs px-2 py-1
					whitespace-nowrap shadow-md transition-opacity duration-200
					${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
			>
				{label}
			</span>
		</span>
	);
}

export default ToolTip;
