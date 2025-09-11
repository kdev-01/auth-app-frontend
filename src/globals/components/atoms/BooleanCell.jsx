function BooleanCell({ value, readOnly = false }) {
	const checked = value === true || value === 1 || value === "true";

	return (
		<input
			type="checkbox"
			checked={checked}
			readOnly={readOnly}
			aria-label={checked ? "Sí" : "No"}
			tabIndex={-1}
		/>
	);
}

export default BooleanCell;
