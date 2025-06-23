import useSidebarSubmenu from "@modules/dashboard/hooks/useSidebarSubmenu";
import MenuButton from "../molecules/MenuButton";
import MenuLink from "../molecules/MenuLink";
import SubmenuList from "../molecules/SubmenuList";

function SidebarNav({ navItems, visible }) {
	const { openSubmenu, subMenuHeight, subMenuRefs, toggleSubmenu } =
		useSidebarSubmenu(navItems);
	const isPathActive = (path) => location.pathname === path;

	return (
		<nav>
			<ul className="flex flex-col gap-4">
				{navItems.map((item, index) => {
					const isOpen = openSubmenu === index;

					return (
						<li key={item.path}>
							{item.subItems ? (
								<>
									<MenuButton
										onClick={() => toggleSubmenu(index)}
										isOpen={isOpen}
										icon={item.icon}
										label={item.name}
										visible={visible}
									/>
									{visible && (
										<SubmenuList
											refItem={(item) => (subMenuRefs.current[index] = item)}
											items={item.subItems}
											isOpen={isOpen}
											height={subMenuHeight[index]}
											isPathActive={isPathActive}
										/>
									)}
								</>
							) : (
								<MenuLink
									to={item.path}
									active={isPathActive(item.path)}
									icon={item.icon}
									label={item.name}
									visible={visible}
								/>
							)}
						</li>
					);
				})}
			</ul>
		</nav>
	);
}

export default SidebarNav;
