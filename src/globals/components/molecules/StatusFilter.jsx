function StatusFilter({ value, onChange, options }) {
	return (
		<div className="flex flex-col gap-1 text-sm">
			{options.map((option) => (
				<label
					key={option.value}
					className="flex items-center gap-2 text-gray-700"
				>
					<input
						type="radio"
						name="radiogroup"
						checked={value === option.value}
						onChange={() => onChange(option.value)}
					/>
					<span>{option.label}</span>
				</label>
			))}
		</div>
	);
}

export default StatusFilter;
