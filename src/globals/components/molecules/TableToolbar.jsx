import { Button, TextInput } from "@globals/components";

function TableToolbar({
	name,
	placeholder,
	search,
	setSearch,
	openModal,
	icon: Icon,
	filterButton = null,
}) {
	return (
		<div className="grid grid-cols-[1fr_auto_auto] gap-3">
			<TextInput
				name={name}
				placeholder={placeholder}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				onClear={() => setSearch("")}
			/>

			{filterButton}

			<Button className="bg-green-600" onClick={openModal}>
				<Icon />
			</Button>
		</div>
	);
}

export default TableToolbar;
