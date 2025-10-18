import { DropdownMenu, IconButton } from "@globals/components";
import { useFloatingMenu } from "@globals/hooks";
import { createPortal } from "react-dom";
import { LuEllipsis } from "react-icons/lu";

function ActionsMenu({ actions = [] }) {
	const { open, toggle, close, triggerRef, contentRef, position, id } =
		useFloatingMenu({ offsetX: -144 });

	return (
		<>
			<IconButton
				ref={triggerRef}
				icon={LuEllipsis}
				aria-label="Abrir menú de acciones"
				aria-haspopup="true"
				aria-expanded={open}
				aria-controls={id}
				onClick={toggle}
			/>
			{open &&
				createPortal(
					<DropdownMenu
						ref={contentRef}
						id={id}
						labelledBy={id}
						position={position}
						actions={actions}
						onSelect={close}
					/>,
					document.getElementById("portal-root"),
				)}
		</>
	);
}

export default ActionsMenu;
