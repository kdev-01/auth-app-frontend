import { AuthContext } from "@globals/contexts";
import useSidebarSubmenu from "@modules/dashboard/hooks/useSidebarSubmenu";
import { menuIconMap } from "@modules/dashboard/utils/menuIconMap";
import { useContext } from "react";
import MenuButton from "../molecules/MenuButton";
import MenuLink from "../molecules/MenuLink";
import SubmenuList from "../molecules/SubmenuList";

function SidebarNav({ visible }) {
	const { user } = useContext(AuthContext);
	const { openSubmenu, subMenuHeight, subMenuRefs, toggleSubmenu } =
		useSidebarSubmenu(user.session?.menu);
	const isPathActive = (path) => location.pathname === path;

	return (
		<nav>
			<ul className="flex flex-col gap-4">
				{user?.session?.menu?.map((item, index) => {
					const isOpen = openSubmenu === index;
					const icon = menuIconMap[item.name];

					return (
						<li key={item.path}>
							{item.children ? (
								<>
									<MenuButton
										onClick={() => toggleSubmenu(index)}
										isOpen={isOpen}
										icon={icon}
										label={item.name}
										visible={visible}
									/>
									{visible && (
										<SubmenuList
											refItem={(item) => (subMenuRefs.current[index] = item)}
											items={item.children}
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
									icon={icon}
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
