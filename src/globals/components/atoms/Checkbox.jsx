function Checkbox({
	id,
	checked = false,
	onChange,
	disabled = false,
	className = "",
}) {
	return (
		<input
			id={id}
			type="checkbox"
			checked={checked}
			onChange={onChange}
			disabled={disabled}
			className={`h-4 w-4 roundedn cursor-pointer ${className}`}
		/>
	);
}

export default Checkbox;
