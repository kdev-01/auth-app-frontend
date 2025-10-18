export const institutionFiltersConfig = [
	{
		key: "city",
		label: "Ciudad",
		type: "enum",
		options: [],
		accessor: (institution) => institution.cityId,
	},
	{
		key: "status",
		label: "Estado",
		type: "enum",
		options: [
			{ value: "Afiliado", label: "Afiliado" },
			{ value: "Sancionado", label: "Sancionado" },
		],
		accessor: (institution) => institution.status,
	},
	{
		key: "deleted",
		label: "Instituciones eliminadas",
		type: "triState",
		accessor: (institution) => institution.isDeleted,
	},
];
