import TextInput from "../atoms/TextInput";

function InputField({
	children,
	type,
	placeholder = "",
	name,
	register,
	error,
}) {
	return (
		<div>
			<label className="font-medium">
				{children}
				<TextInput
					type={type}
					placeholder={placeholder}
					name={name}
					register={register}
					error={error[name]}
				/>
			</label>

			<div className="min-h-[1.2rem]">
				{error && (
					<span className="text-red-600 text-xs">{error[name]?.message}</span>
				)}
			</div>
		</div>
	);
}

export default InputField;
