const genderMap = {
	M: "Masculino",
	F: "Femenino",
	O: "Otro",
};

export const mapStudents = (rows) =>
	Array.isArray(rows)
		? rows.map((s) => ({
				id: s.person_id,
				nationalID: s.national_id_number ?? null,
				firstName: s.first_name ?? "",
				lastName: s.last_name ?? "",
				url: s.photo_url ?? null,
				dateOfBirth: s.date_of_birth ?? null,
				bloodType: s.blood_type ?? null,
				gender: genderMap[s.gender] ?? "No especificado",
				enrolmentNum: s.enrolment_num ?? null,
				status: s.is_deleted,
			}))
		: [];
