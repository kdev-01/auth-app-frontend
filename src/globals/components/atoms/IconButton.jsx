function IconButton({ icon: Icon, ...props }) {
	return (
		<button
			className="text-gray-500 hover:text-gray-700 cursor-pointer"
			type="button"
			{...props}
		>
			<Icon size={20} />
		</button>
	);
}

export default IconButton;
