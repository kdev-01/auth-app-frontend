import { BiErrorCircle } from "react-icons/bi";

const TextInput = ({ type = "text", placeholder, name, register, error }) => (
	<div className="relative">
		<input
			type={type}
			placeholder={placeholder}
			{...register(name)}
			className={`w-full
						rounded-md
						shadow-sm
						border
						py-2 px-3
						focus:outline-none
						${
							error
								? "border-red-500 text-red-500 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
								: "border-gray-400 focus:ring-blue-900 focus:border-blue-900"
						}`}
		/>

		{error && (
			<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
				<BiErrorCircle className="h-5 w-5 text-red-500" />
			</div>
		)}
	</div>
);

export default TextInput;
