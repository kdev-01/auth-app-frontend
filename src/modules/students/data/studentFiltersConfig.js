export const studentFiltersConfig = [
	{
		key: "bloodType",
		label: "Tipo de sangre",
		type: "enum",
		options: [
			{ value: "O+", label: "O+" },
			{ value: "O-", label: "O-" },
			{ value: "A+", label: "A+" },
			{ value: "A-", label: "A-" },
			{ value: "B+", label: "B+" },
			{ value: "B-", label: "B-" },
			{ value: "AB+", label: "AB+" },
			{ value: "AB-", label: "AB-" },
		],
		accessor: (student) => student.bloodType,
	},
	{
		key: "gender",
		label: "Género",
		type: "enum",
		options: [
			{ value: "Masculino", label: "Masculino" },
			{ value: "Femenino", label: "Femenino" },
			{ value: "Otro", label: "Otro" },
		],
		accessor: (student) => student.gender,
	},
	{
		key: "deleted",
		label: "Estudiantes eliminados",
		type: "triState",
		accessor: (student) => student.status,
	},
];
