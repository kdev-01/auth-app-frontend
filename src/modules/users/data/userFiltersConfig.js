export const userFiltersConfig = [
	{
		key: "role",
		label: "Rol",
		type: "enum",
		options: [],
		accessor: (user) => user.roleId,
	},
	{
		key: "deleted",
		label: "Usuarios eliminados",
		type: "triState",
		accessor: (user) => user.status,
	},
];
