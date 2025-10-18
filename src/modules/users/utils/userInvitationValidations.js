import {
	emailValidations,
	firstNameValidations,
	lastNameValidations,
	selectValidation,
} from "@globals/utils";
import { z } from "zod";

export const userInvitationValidation = z.object({
	email: emailValidations,
	first_name: firstNameValidations,
	last_name: lastNameValidations,
	role_id: selectValidation,
	institution_id: selectValidation.optional(),
});
