import { Link } from "react-router-dom";

function ImageLink({ to, src, alt, className = "" }) {
	return (
		<Link to={to}>
			<img className={className} src={src} alt={alt} />
		</Link>
	);
}

export default ImageLink;
