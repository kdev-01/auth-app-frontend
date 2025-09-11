import { Bouncy } from "ldrs/react";

function Button({
	type = "button",
	onClick,
	children,
	isLoading = false,
	title = "",
	className = "",
	...rest
}) {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={isLoading}
			title={title}
			className={`
				cursor-pointer
				bg-blue-900 text-neutral-50
				px-5 py-2.5
				rounded-2xl
				font-semibold
				shadow-md
				active:scale-95
				transition-all duration-300 ease-in-out
				hover:brightness-110
				hover:shadow-xl
				${className}
			`}
			{...rest}
		>
			{isLoading ? <Bouncy size="25" speed="1.75" color="White" /> : children}
		</button>
	);
}

export default Button;
