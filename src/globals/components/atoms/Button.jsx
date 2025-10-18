import { Bouncy } from "ldrs/react";
import { forwardRef } from "react";

const Button = forwardRef(
	(
		{
			type = "button",
			onClick,
			children,
			isLoading = false,
			title = "",
			className = "",
			...rest
		},
		ref,
	) => {
		return (
			<button
				ref={ref}
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
	},
);

Button.displayName = "Button";

export default Button;
