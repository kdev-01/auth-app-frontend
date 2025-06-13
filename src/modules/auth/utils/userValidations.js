import { z } from "zod";
import { emailValidations, passwordValidations } from "@globals/utils";

export const loginDataValidation = z.object({
	email: emailValidations,
	password: passwordValidations,
});
