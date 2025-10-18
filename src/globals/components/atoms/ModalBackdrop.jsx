function ModalBackdrop({ onClick }) {
	return (
		<div
			className="fixed inset-0 bg-gray-400/50 backdrop-blur-[32px]"
			aria-hidden="true"
			onClick={onClick}
		/>
	);
}

export default ModalBackdrop;
