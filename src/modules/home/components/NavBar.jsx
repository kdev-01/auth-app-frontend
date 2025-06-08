import { useScrolled } from "@globals/hooks";
import { ImageLink } from "@globals/components";
import { InternalLink } from "@globals/components";
import Menu from "./Menu";
import menuItems from "../menuItems";
import logo from "/logo.png";

function NavBar() {
	const scrolled = useScrolled(10);

	return (
		<nav
			className={`flex justify-between items-center p-2 border-b border-white ${
				scrolled ? "bg-white/10 backdrop-blur-md" : "bg-transparent"
			} `}
		>
			<ImageLink to="/" src={logo} alt="Logo FDPEN" />
			<Menu items={menuItems} />
			<InternalLink to="/login">Iniciar sesión</InternalLink>
		</nav>
	);
}

export default NavBar;
