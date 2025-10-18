function SelectField({
	children,
	name,
	options,
	isLoading,
	register,
	error,
	placeholder = "Seleccione una opción",
	includeAll = false,
	disabled = false,
}) {
	return (
		<>
			<label className="font-medium">
				{children}
				<select
					name={name}
					{...register(name)}
					disabled={disabled || isLoading}
					defaultValue=""
					className={`w-full mt-1 rounded-md shadow-sm border py-2 px-3 pr-10 cursor-pointer focus:outline-none appearance-none ${
						error?.[name]
							? "border-red-500 text-red-500 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
							: "border-gray-400 focus:ring-blue-900 focus:border-blue-900"
					}`}
				>
					<option value="" disabled>
						{placeholder}
					</option>
					{includeAll && (
						<option key="all" value="Todos">
							Todos
						</option>
					)}
					{options.map((option) => (
						<option key={option.id} value={option.id}>
							{option.value}
						</option>
					))}
				</select>
			</label>

			<div className="min-h-[1.2rem]">
				{error[name] && (
					<span className="text-red-600 text-xs">{error[name]?.message}</span>
				)}
			</div>
		</>
	);
}

export default SelectField;
