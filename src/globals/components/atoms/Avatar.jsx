import defaultUser from "@assets/defaultUser.png";

function Avatar({ src, alt, size = "w-10 h-10" }) {
	return (
		<img
			src={src || defaultUser}
			alt={alt}
			className={`${size} rounded-full object-cover`}
		/>
	);
}

export default Avatar;
