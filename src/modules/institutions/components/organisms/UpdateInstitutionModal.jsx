import { Modal } from "@globals/components";
import { InputField, SelectField } from "@globals/components";
import { useApiQuery } from "@globals/hooks";
import { normalizeOptions } from "@globals/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { institutionStatusData } from "@modules/institutions/data/institutionStatusData";
import { getAllCities } from "@modules/institutions/services/institutionService";
import { updateInstitutionValidation } from "@modules/institutions/utils/updateInstitutionValidation";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

function UpdateInstitutionModal({ isOpen, onClose, initialData }) {
	const { data: cities = [], isLoading } = useApiQuery({
		key: ["cities"],
		queryFn: getAllCities,
		time: 10,
		select: normalizeOptions,
	});
	const formId = "updateInstitutionForm";
	const isPending = false;

	const defaultValues = useMemo(() => {
		if (!initialData) return { name: "", city_id: "", status: "affiliated" };
		return {
			name: initialData.name ?? "",
			city_id: initialData.cityId ?? "",
			status: initialData.status ?? "",
		};
	}, [initialData]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: zodResolver(updateInstitutionValidation),
		defaultValues,
		values: defaultValues,
	});

	useEffect(() => {
		if (isOpen && initialData) reset(defaultValues);
	}, [isOpen, initialData, defaultValues, reset]);

	const onSubmit = async (formValues) => {
		console.log(formValues);
	};

	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				title="Editar unidad educativa"
				description="Modifica la información de la unidad educativa en el sistema."
				formId={formId}
				submitLabel="Guardar cambios"
				isLoading={isPending}
			>
				<form
					id={formId}
					onSubmit={handleSubmit(onSubmit)}
					className="w-full flex flex-col"
				>
					<InputField
						type="text"
						placeholder="U.E. Nacional Tena"
						name="name"
						register={register}
						error={errors}
					>
						Nombre
					</InputField>

					<SelectField
						name="city_id"
						options={cities}
						isLoading={isLoading}
						register={register}
						error={errors}
					>
						Ciudad
					</SelectField>

					<SelectField
						name="status"
						options={institutionStatusData}
						register={register}
						error={errors}
					>
						Estado
					</SelectField>
				</form>
			</Modal>
		</>
	);
}

export default UpdateInstitutionModal;
