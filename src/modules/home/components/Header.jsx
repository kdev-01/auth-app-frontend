import { BackgroundImage } from "@globals/components";
import NavBar from "./NavBar";
import banner_image from "@assets/banner_image.png";

function Header() {
	return (
		<header className="relative h-screen overflow-hidden">
			<div className="absolute inset-0 z-0">
				<BackgroundImage
					src={banner_image}
					alt="Fotos representativas de la federación"
				/>
			</div>

			<div className="relative z-10">
				<NavBar />
			</div>
		</header>
	);
}

export default Header;
