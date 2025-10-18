import { BiChevronDown } from "react-icons/bi";

function ChevronIcon({ isOpen }) {
	return (
		<BiChevronDown
			className={`ml-auto w-5 h-5 transition-transform duration-200 ${
				isOpen ? "rotate-180 text-brand-500" : ""
			}`}
		/>
	);
}

export default ChevronIcon;
