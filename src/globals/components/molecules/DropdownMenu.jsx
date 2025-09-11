import { forwardRef } from "react";
import { DropdownItem } from ".";

const DropdownMenu = forwardRef(
	({ id, labelledBy, position, actions = [], onSelect }, ref) => {
		return (
			<ul
				ref={ref}
				id={id}
				role="menu"
				aria-labelledby={labelledBy}
				className="absolute w-36 bg-white border border-gray-200 rounded-md shadow-lg z-50"
				style={{ top: position.top, left: position.left }}
			>
				{actions.map((action) => (
					<DropdownItem
						key={action.label}
						onClick={() => {
							onSelect?.();
							action.onClick?.();
						}}
						icon={action.icon}
						danger={action.danger}
					>
						{action.label}
					</DropdownItem>
				))}
			</ul>
		);
	},
);

export default DropdownMenu;
