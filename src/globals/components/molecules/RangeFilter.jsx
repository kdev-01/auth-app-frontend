function RangeFilter({ value = { min: "", max: "" }, onChange }) {
	return (
		<div className="grid grid-cols-2 gap-2">
			<input
				type="number"
				placeholder="Mín"
				className="border rounded px-2 py-1 text-sm"
				value={value.min ?? ""}
				onChange={(e) =>
					onChange({
						...value,
						min: e.target.value === "" ? null : Number(e.target.value),
					})
				}
			/>
			<input
				type="number"
				placeholder="Máx"
				className="border rounded px-2 py-1 text-sm"
				value={value.max ?? ""}
				onChange={(e) =>
					onChange({
						...value,
						max: e.target.value === "" ? null : Number(e.target.value),
					})
				}
			/>
		</div>
	);
}

export default RangeFilter;
