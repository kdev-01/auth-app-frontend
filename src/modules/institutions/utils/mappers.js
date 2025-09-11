const statusMap = {
	affiliated: "Afiliado",
	unaffiliated: "Desafiliado",
	sanctioned: "Sancionado",
};

export const mapAllInstitutions = (rows) =>
	Array.isArray(rows)
		? rows.map((i) => ({
				id: i.institution_id,
				name: i.name,
				status: statusMap[i.status] ?? i.status,
				affiliatedAt: i.created_at,
				occurredAt: i.occurred_at,
				cityId: i.city?.city_id ?? null,
				city: i.city?.name ?? null,
				isActive: i.status === "affiliated",
			}))
		: [];
