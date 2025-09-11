import { institutionNameValidations, selectValidation } from "@globals/utils";
import { z } from "zod";

export const updateInstitutionValidation = z.object({
	name: institutionNameValidations,
	city_id: selectValidation,
	status: selectValidation,
});
