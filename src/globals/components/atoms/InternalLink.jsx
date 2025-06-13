import { Link } from "react-router-dom";

function InternalLink({ to, children, className = "" }) {
	return (
		<Link
			to={to}
			className={`inline-block font-medium hover:underline ${className}`}
		>
			{children}
		</Link>
	);
}

export default InternalLink;
