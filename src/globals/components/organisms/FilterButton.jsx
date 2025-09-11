import { Button, Checkbox, IconButton, Switch } from "@globals/components";
import { useFloatingMenu } from "@globals/hooks";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { LuFilter } from "react-icons/lu";

/**
 * props:
 * - config: ver useTableFilters
 * - value: estado actual de filtros (obj)
 * - onChange: (draft) => void
 * - badge: número para mostrar contador (opcional)
 * - idBase: string base para aria-ids únicos
 */
export default function FilterButton({
	config = [],
	value = {},
	onChange,
	badge,
	idBase = "filters-btn",
}) {
	const { open, toggle, close, triggerRef, contentRef, position, id } =
		useFloatingMenu({ offsetX: -260, offsetY: 8 });

	// copiamos estado al abrir para trabajar en draft
	const [draft, setDraft] = useState(value);
	const openMenu = () => {
		setDraft(value);
		toggle();
	};

	const apply = () => {
		onChange?.(draft);
		close();
	};
	const clearAll = () => {
		const clean = {};
		config.forEach((f) => {
			if (f.type === "enum") clean[f.key] = new Set();
			else if (f.type === "triState") clean[f.key] = "all";
			else clean[f.key] = null;
		});
		setDraft(clean);
	};

	const active = useMemo(() => badge ?? 0, [badge]);

	return (
		<>
			<div className="relative">
				<IconButton
					ref={triggerRef}
					icon={LuFilter}
					aria-label="Abrir filtros"
					aria-haspopup="dialog"
					aria-expanded={open}
					aria-controls={id}
					onClick={openMenu}
					className="relative"
				/>
				{active > 0 && (
					<span className="absolute -top-1 -right-1 rounded-full text-[10px] px-1.5 py-[1px] bg-blue-600 text-white">
						{active}
					</span>
				)}
			</div>

			{open &&
				createPortal(
					<div
						ref={contentRef}
						id={id}
						role="dialog"
						aria-label="Panel de filtros"
						className="absolute z-50 w-72 max-h-[80vh] overflow-auto rounded-lg border border-gray-200 bg-white shadow-xl p-2"
						style={{ top: position.top, left: position.left }}
					>
						<header className="px-2 py-1 flex items-center justify-between">
							<h3 className="text-sm font-semibold text-gray-700">Filtros</h3>
							<button
								onClick={() => {
									clearAll();
									onChange?.(draft); // opcional: no aplicar de inmediato
								}}
								className="text-xs text-blue-600 hover:underline"
							>
								Borrar todo
							</button>
						</header>

						<div className="divide-y">
							{config.map((f) => (
								<Section
									key={f.key}
									field={f}
									value={draft[f.key]}
									onChange={(v) => setDraft((s) => ({ ...s, [f.key]: v }))}
									idBase={`${idBase}-${f.key}`}
								/>
							))}
						</div>

						<footer className="p-2 flex gap-2">
							<Button className="flex-1" onClick={apply}>
								Aplicar
							</Button>
							<Button variant="ghost" className="flex-1" onClick={close}>
								Cancelar
							</Button>
						</footer>
					</div>,
					document.getElementById("portal-root"),
				)}
		</>
	);
}

/* ---------- Secciones ---------- */

function Section({ field, value, onChange, idBase }) {
	const [open, setOpen] = useState(true);
	return (
		<section className="py-1">
			<button
				className="w-full flex items-center justify-between px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded"
				onClick={() => setOpen((o) => !o)}
				aria-expanded={open}
				aria-controls={`${idBase}-content`}
			>
				<span>{field.label}</span>
				<span className="text-gray-400">{open ? "▾" : "▸"}</span>
			</button>

			{open && (
				<div id={`${idBase}-content`} className="px-2 py-1">
					{field.type === "enum" && (
						<EnumList
							options={field.options ?? []}
							value={value}
							onChange={onChange}
						/>
					)}

					{field.type === "boolean" && (
						<BooleanTri
							value={value}
							onChange={onChange}
							labelTrue="Sí"
							labelFalse="No"
						/>
					)}

					{field.type === "triState" && (
						<RadioGroup
							value={value ?? "all"}
							onChange={onChange}
							options={[
								{ value: "exclude", label: "Ocultar eliminados" },
								{ value: "only", label: "Solo eliminados" },
								{ value: "all", label: "Todos" },
							]}
						/>
					)}

					{field.type === "rangeNumber" && (
						<RangeNumber value={value} onChange={onChange} />
					)}
				</div>
			)}
		</section>
	);
}

function EnumList({ options, value = new Set(), onChange }) {
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

function BooleanTri({
	value,
	onChange,
	labelTrue = "Activos",
	labelFalse = "Inactivos",
}) {
	// Tri-state: null (todos), true, false. Mostramos dos checkboxes mutuamente excluyentes.
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

function RadioGroup({ value, onChange, options }) {
	return (
		<div className="flex flex-col gap-1 text-sm">
			{options.map((o) => (
				<label key={o.value} className="flex items-center gap-2 text-gray-700">
					<input
						type="radio"
						name="radiogroup"
						checked={value === o.value}
						onChange={() => onChange(o.value)}
					/>
					<span>{o.label}</span>
				</label>
			))}
		</div>
	);
}

function RangeNumber({ value = { min: "", max: "" }, onChange }) {
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
