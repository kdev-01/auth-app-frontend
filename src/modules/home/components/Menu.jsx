function Menu({ items }) {
	return (
		<ul className="flex gap-x-6 font-medium text-white">
			{items.map((item) => (
				<li key={item.path}>
					<a href={item.path}>{item.label}</a>
				</li>
			))}
		</ul>
	);
}

export default Menu;
