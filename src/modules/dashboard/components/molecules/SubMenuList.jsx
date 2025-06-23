import { Link } from "react-router-dom";

function SubMenuList({ refItem, items, isOpen, height, isPathActive }) {
	return (
		<div
			ref={refItem}
			className="overflow-hidden transition-all duration-300"
			style={{ height: isOpen ? `${height}px` : "0px" }}
		>
			<ul className="mt-2 space-y-1 ml-9">
				{items.map((sub) => (
					<li key={sub.name}>
						<Link
							to={sub.path}
							className={`flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium ${
								isPathActive(sub.path)
									? "bg-blue-50 text-blue-700"
									: "hover:bg-gray-100"
							}`}
						>
							{sub.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export default SubMenuList;
