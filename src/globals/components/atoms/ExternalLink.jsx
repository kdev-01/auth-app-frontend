function ExternalLink({
	children,
	href,
	target = "_self",
	rel = "noopener noreferrer",
}) {
	return (
		<a
			href={href}
			target={target}
			rel={rel}
			className="px-4 py-2 font-medium text-white hover:underline"
		>
			{children}
		</a>
	);
}

export default ExternalLink;
