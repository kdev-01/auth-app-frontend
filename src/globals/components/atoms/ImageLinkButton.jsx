import { Link } from "react-router-dom";

function ImageLinkButton({ to, src, alt }) {
	return (
		<Link to={to}>
			<img className="w-14" src={src} alt={alt} />
		</Link>
	);
}

export default ImageLinkButton;
