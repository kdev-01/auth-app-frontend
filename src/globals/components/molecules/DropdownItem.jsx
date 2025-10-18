import { Link } from "react-router-dom";

function DropdownItem({ children, to, onClick, icon: Icon, danger = false }) {
	const baseClasses = `flex items-center gap-2 w-full text-left px-4 py-2 text-sm cursor-pointer ${
		danger ? "text-red-600 hover:bg-red-50" : "text-gray-700 hover:bg-gray-100"
	}`;

	const content = (
		<>
			{Icon && <Icon className="w-4 h-4" />}
			{children}
		</>
	);

	return (
		<li role="none">
			{to ? (
				<Link to={to} role="menuitem" className={baseClasses}>
					{content}
				</Link>
			) : (
				<button
					onClick={onClick}
					role="menuitem"
					className={baseClasses}
					type="button"
				>
					{content}
				</button>
			)}
		</li>
	);
}

export default DropdownItem;
