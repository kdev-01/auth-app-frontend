import { institutionNameValidations, selectValidation } from "@globals/utils";
import { z } from "zod";

export const addInstitutionValidation = z.object({
	name: institutionNameValidations,
	city_id: selectValidation,
});
