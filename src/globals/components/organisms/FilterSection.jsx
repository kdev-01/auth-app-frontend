import { useState } from "react";
import {
	BooleanFilter,
	EnumFilter,
	RangeFilter,
	StatusFilter,
} from "../molecules";

function FilterSection({ field, value, onChange }) {
	const [open, setOpen] = useState(true);

	return (
		<section className="py-1">
			<button
				onClick={() => setOpen((o) => !o)}
				aria-expanded={open}
				type="button"
				className="w-full flex items-center justify-between px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded"
			>
				<span>{field.label}</span>
				<span className="text-gray-400">{open ? "▾" : "▸"}</span>
			</button>

			{open && (
				<div className="px-2 py-1">
					{field.type === "enum" && (
						<EnumFilter
							options={field.options ?? []}
							value={value}
							onChange={onChange}
						/>
					)}

					{field.type === "boolean" && (
						<BooleanFilter
							value={value}
							onChange={onChange}
							labelTrue="Sí"
							labelFalse="No"
						/>
					)}

					{field.type === "triState" && (
						<StatusFilter
							value={value ?? "all"}
							onChange={onChange}
							options={[
								{ value: "exclude", label: "Ocultar eliminados" },
								{ value: "only", label: "Eliminados" },
								{ value: "all", label: "Todos" },
							]}
						/>
					)}

					{field.type === "rangeNumber" && (
						<RangeFilter value={value} onChange={onChange} />
					)}
				</div>
			)}
		</section>
	);
}

export default FilterSection;
