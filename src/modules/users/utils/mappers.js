export const mapUsers = (rows) =>
	Array.isArray(rows)
		? rows.map((u) => ({
				id: u.person_id,
				nationalID: u.national_id_number ?? null,
				firstName: u.first_name ?? "",
				lastName: u.last_name ?? "",
				url: u.photo_url ?? null,
				email: u.email,
				phone: u.phone_number ?? null,
				roleId: u.role?.role_id,
				role: u.role?.name,
				institution: u.role?.institution?.name ?? null,
				status: u.is_deleted,
			}))
		: [];
