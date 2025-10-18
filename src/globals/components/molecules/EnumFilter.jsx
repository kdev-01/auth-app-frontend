import { Checkbox } from "../atoms";

function EnumFilter({ options, value = new Set(), onChange }) {
	const toggle = (val) => {
		const next = new Set(value);
		if (next.has(val)) next.delete(val);
		else next.add(val);
		onChange(next);
	};

	return (
		<ul className="space-y-1">
			{options.map((opt) => (
				<li key={opt.value}>
					<label className="flex items-center gap-2 text-sm text-gray-700">
						<Checkbox
							checked={value?.has(opt.value)}
							onChange={() => toggle(opt.value)}
						/>
						<span>{opt.label}</span>
					</label>
				</li>
			))}
		</ul>
	);
}

export default EnumFilter;
