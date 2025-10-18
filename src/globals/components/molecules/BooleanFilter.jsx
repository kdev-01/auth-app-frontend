import { Checkbox } from "../atoms";

function BooleanFilter({
	value,
	onChange,
	labelTrue = "Activos",
	labelFalse = "Inactivos",
}) {
	return (
		<div className="flex flex-col gap-1 text-sm">
			<label className="flex items-center gap-2 text-gray-700">
				<Checkbox
					checked={value === true}
					onChange={() => onChange(value === true ? null : true)}
				/>
				<span>{labelTrue}</span>
			</label>
			<label className="flex items-center gap-2 text-gray-700">
				<Checkbox
					checked={value === false}
					onChange={() => onChange(value === false ? null : false)}
				/>
				<span>{labelFalse}</span>
			</label>
		</div>
	);
}

export default BooleanFilter;
