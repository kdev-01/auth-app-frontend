function BackgroundImage({ src, alt }) {
	return (
		<img
			src={src}
			alt={alt}
			className="w-full h-full object-cover filter brightness-90"
		/>
	);
}

export default BackgroundImage;
