import { ImageLink } from "@globals/components";
import { InternalLink } from "@globals/components";
import { useScrolled } from "@globals/hooks";
import logo from "/logo.png";
import navItems from "../data/navItems";
import HomeMenu from "./HomeMenu";

function NavBar() {
	const scrolled = useScrolled(10);

	return (
		<nav
			className={`flex justify-between items-center p-2 border-b border-white ${
				scrolled ? "bg-white/10 backdrop-blur-md" : "bg-transparent"
			} `}
		>
			<ImageLink to="/" src={logo} alt="Logo FDPEN" className="w-14" />
			<HomeMenu items={navItems} />
			<InternalLink to="/login" className="px-4 py-2 text-white">
				Iniciar sesión
			</InternalLink>
		</nav>
	);
}

export default NavBar;
