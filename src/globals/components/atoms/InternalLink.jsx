import { Link } from "react-router-dom";

function InternalLink({ to, children }) {
	return (
		<Link
			to={to}
			className="px-4 py-2 text-sm font-medium text-white hover:underline"
		>
			{children}
		</Link>
	);
}

export default InternalLink;
