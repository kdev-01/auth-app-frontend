import { emailValidations, passwordValidations } from "@globals/utils";
import { z } from "zod";

export const loginDataValidation = z.object({
	email: emailValidations,
	password: passwordValidations,
});
