import { InputField, Modal, SelectField } from "@globals/components";
import { useApiQuery } from "@globals/hooks";
import { normalizeOptions } from "@globals/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { institutionStatusData } from "@modules/institutions/data/institutionStatusData";
import { getAllCities } from "@modules/institutions/services/institutionService";
import { institutionUpdateValidation } from "@modules/institutions/utils/institutionUpdateValidation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function UpdateInstitutionModal({ isOpen, onClose, initialData }) {
	const { data: cities = [], isLoading } = useApiQuery({
		key: ["cities"],
		queryFn: getAllCities,
		time: 10,
		select: normalizeOptions,
	});
	const formId = "updateInstitutionForm";

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: zodResolver(institutionUpdateValidation),
	});

	useEffect(() => {
		if (isOpen && initialData) {
			reset({
				name: initialData.name ?? "",
				city_id: initialData.cityId ?? "",
				status: initialData.status ?? "",
			});
		}
	}, [isOpen, initialData, reset]);

	const onSubmit = async (formValues) => {
		console.log(formValues);
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title="Editar unidad educativa"
			description="Modifica la información de la unidad educativa en el sistema."
			formId={formId}
			submitLabel="Guardar cambios"
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
	);
}

export default UpdateInstitutionModal;
