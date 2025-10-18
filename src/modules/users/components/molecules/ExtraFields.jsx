import { SelectField } from "@globals/components";
import { useApiQuery } from "@globals/hooks";
import { normalizeOptions } from "@globals/utils";
import { getAllInstitutions } from "@modules/institutions/services/institutionService";

function ExtraFields({ selectedRole, roles, register, error }) {
	const { data: institutions = [], isLoading } = useApiQuery({
		key: ["institutions"],
		queryFn: getAllInstitutions,
		select: normalizeOptions,
	});

	const extraFields = [
		{
			name: "Representante educativo",
			field: (
				<SelectField
					name="institution_id"
					options={institutions}
					isLoading={isLoading}
					register={register}
					error={error}
				>
					Unidad educativa
				</SelectField>
			),
		},
	];

	const currentRole = roles.find((role) => role.id === selectedRole);
	const fieldsToRender = extraFields.find(
		(item) => item.name === currentRole?.value,
	);

	return fieldsToRender?.field || null;
}

export default ExtraFields;
