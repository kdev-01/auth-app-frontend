import {
	emailValidations,
	firstNameValidations,
	lastNameValidations,
	nationalIDValidations,
	phoneNumberValidations,
} from "@globals/utils";
import { z } from "zod";

export const userUpdateValidation = z.object({
	national_id_number: nationalIDValidations,
	email: emailValidations,
	first_name: firstNameValidations,
	last_name: lastNameValidations,
	phone_number: phoneNumberValidations,
});
