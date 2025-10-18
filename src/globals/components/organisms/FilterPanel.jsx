import { FilterSection } from "@globals/components";

function FilterPanel({ config = [], value = {}, onChange, onClearAll }) {
	return (
		<div className="w-72 max-h-[80vh] overflow-auto rounded-lg border border-gray-200 bg-white shadow-xl p-2">
			<header className="px-2 py-1 flex items-center justify-between">
				<h3 className="text-sm font-semibold text-gray-700">Filtros</h3>
				<button
					onClick={onClearAll}
					type="button"
					className="text-xs cursor-pointer text-blue-600 hover:underline"
				>
					Borrar todo
				</button>
			</header>

			<div className="divide-y">
				{config.map((field) => (
					<FilterSection
						key={field.key}
						field={field}
						value={value[field.key]}
						onChange={(v) => onChange(field.key, v)}
					/>
				))}
			</div>
		</div>
	);
}

export default FilterPanel;
