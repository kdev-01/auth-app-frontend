import { Button, FilterPanel } from "@globals/components";
import { useFloatingMenu } from "@globals/hooks";
import { useMemo } from "react";
import { createPortal } from "react-dom";
import { LuFilter } from "react-icons/lu";

function FilterButton({ config = [], value = {}, onChange, badge }) {
	const { open, toggle, triggerRef, contentRef, position } = useFloatingMenu({
		offsetX: -260,
		offsetY: 8,
	});

	const handleFilterChange = (key, filterValue) => {
		const newFilters = { ...value, [key]: filterValue };
		onChange?.(newFilters);
	};

	const handleClearAll = () => {
		const clean = {};
		config.forEach((f) => {
			if (f.type === "enum") clean[f.key] = new Set();
			else if (f.type === "triState") clean[f.key] = "exclude";
			else clean[f.key] = null;
		});
		onChange?.(clean);
	};

	const activeCount = useMemo(() => badge ?? 0, [badge]);

	return (
		<>
			<div className="relative">
				<Button
					ref={triggerRef}
					aria-label="Abrir filtros"
					onClick={toggle}
					className="bg-orange-400 h-full"
				>
					<LuFilter />
				</Button>
				{activeCount > 0 && (
					<span className="absolute -top-1 -right-1 rounded-full text-[10px] px-1.5 py-[1px] bg-blue-500 text-white font-bold">
						{activeCount}
					</span>
				)}
			</div>

			{open &&
				createPortal(
					<div
						ref={contentRef}
						role="dialog"
						aria-label="Panel de filtros"
						className="absolute z-50"
						style={{ top: position.top, left: position.left }}
					>
						<FilterPanel
							config={config}
							value={value}
							onChange={handleFilterChange}
							onClearAll={handleClearAll}
						/>
					</div>,
					document.getElementById("portal-root"),
				)}
		</>
	);
}

export default FilterButton;
