import { buildFormData, httpClient } from "@globals/services";

const API = {
	STUDENTS: "students/",
};

export const getAllStudents = async () => {
	return [
		{
			person_id: 1,
			national_id_number: "0912345678",
			first_name: "Juan",
			last_name: "Pérez",
			photo_url: "https://randomuser.me/api/portraits/men/11.jpg",
			date_of_birth: "2005-03-15",
			blood_type: "O+",
			gender: "M",
			enrolment_num: "STU-2023-001",
			is_deleted: false,
		},
		{
			person_id: 2,
			national_id_number: "0923456789",
			first_name: "María",
			last_name: "Gómez",
			photo_url: "https://randomuser.me/api/portraits/women/22.jpg",
			date_of_birth: "2006-07-20",
			blood_type: "A+",
			gender: "F",
			enrolment_num: "STU-2023-002",
			is_deleted: false,
		},
		{
			person_id: 3,
			national_id_number: "0934567890",
			first_name: "Carlos",
			last_name: "Andrade",
			photo_url: "https://randomuser.me/api/portraits/men/33.jpg",
			date_of_birth: "2004-11-02",
			blood_type: "B-",
			gender: "M",
			enrolment_num: "STU-2023-003",
			is_deleted: true,
		},
		{
			person_id: 4,
			national_id_number: "0945678901",
			first_name: "Sofía",
			last_name: "Mendoza",
			photo_url: "https://randomuser.me/api/portraits/women/44.jpg",
			date_of_birth: "2005-01-28",
			blood_type: "AB+",
			gender: "F",
			enrolment_num: "STU-2023-004",
			is_deleted: false,
		},
		{
			person_id: 5,
			national_id_number: "0956789012",
			first_name: "Alex",
			last_name: "Ríos",
			photo_url: "https://randomuser.me/api/portraits/men/55.jpg",
			date_of_birth: "2007-09-10",
			blood_type: "O-",
			gender: "O",
			enrolment_num: "STU-2023-005",
			is_deleted: false,
		},
	];
};

export const createStudent = async (payload) => {
	const { photo, ...jsonData } = payload;
	const formData = buildFormData(jsonData, { photo });

	return await httpClient.post(API.STUDENTS, formData, {
		meta: { suppressErrorToast: true },
	});
};

export const updateStudent = async (id, payload) => {
	const { photo, ...jsonData } = payload;
	const formData = buildFormData(jsonData, { photo });

	return await httpClient.put(`${API.STUDENTS}${id}`, formData, {
		meta: { suppressErrorToast: true },
	});
};

export const deleteStudent = async (id) => {
	return await httpClient.delete(`${API.STUDENTS}${id}`, {
		meta: { suppressErrorToast: true },
	});
};
