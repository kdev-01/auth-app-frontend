function StatusBadge({ isActive, children }) {
	const baseStyles = "px-2 py-1 text-xs font-medium rounded-xl";
	const defaultStyles = isActive
		? "bg-green-100 text-green-600"
		: "bg-orange-100 text-orange-600";

	return (
		<span className={`${baseStyles} ${defaultStyles}`}>
			{children ?? (isActive ? "Activo" : "Pendiente")}
		</span>
	);
}

export default StatusBadge;
