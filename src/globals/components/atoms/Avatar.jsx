import defaultUser from "@assets/defaultUser.png";

function Avatar({ src, alt, size = "w-10 h-10", isCircle = true }) {
	const shapeClass = isCircle ? "rounded-full" : "rounded-l-xl";

	return (
		<img
			src={src || defaultUser}
			alt={alt}
			className={`${size} ${shapeClass} object-cover`}
		/>
	);
}

export default Avatar;
