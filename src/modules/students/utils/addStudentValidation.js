import {
	firstNameValidations,
	lastNameValidations,
	selectValidation,
} from "@globals/utils";
import { z } from "zod";

const nationalIdRegex = /^\d{10}$/;
const enrolmentNumRegex = /^[A-Z0-9-]+$/;

export const addStudentValidation = z.object({
	photo: z.instanceof(File).optional().nullable(),
	national_id_number: z
		.string({ required_error: "La cédula es obligatoria." })
		.regex(nationalIdRegex, {
			message: "La cédula debe tener exactamente 10 dígitos.",
		}),
	first_name: firstNameValidations,
	last_name: lastNameValidations,
	date_of_birth: z
		.string({ required_error: "La fecha de nacimiento es obligatoria." })
		.min(1, "La fecha de nacimiento es obligatoria."),
	blood_type: selectValidation,
	gender: selectValidation,
	enrolment_num: z
		.string({ required_error: "El número de matrícula es obligatorio." })
		.min(3, "El número de matrícula debe tener al menos 3 caracteres.")
		.max(20, "El número de matrícula no debe exceder 20 caracteres.")
		.regex(enrolmentNumRegex, {
			message:
				"El número de matrícula solo puede contener letras mayúsculas, números y guiones.",
		}),
});
