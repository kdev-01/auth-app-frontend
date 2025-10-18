import { InputField, Modal, SelectField } from "@globals/components";
import { useConfirmDialog } from "@globals/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateStudent from "@modules/students/hooks/useUpdateStudent";
import {
	bloodTypeOptions,
	genderOptions,
} from "@modules/students/data/studentSelectsData";
import { updateStudentValidation } from "@modules/students/utils/updateStudentValidation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function UpdateStudentModal({ isOpen, onClose, initialData }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm({
		resolver: zodResolver(updateStudentValidation),
	});

	const { mutateAsync: mutateStudent, isPending } = useUpdateStudent();
	const { confirm, ConfirmationUI } = useConfirmDialog();
	const formId = "updateStudentForm";

	useEffect(() => {
		if (initialData) {
			setValue("national_id_number", initialData.nationalID);
			setValue("first_name", initialData.firstName);
			setValue("last_name", initialData.lastName);
			setValue("date_of_birth", initialData.dateOfBirth);
			setValue("blood_type", initialData.bloodType);
			setValue(
				"gender",
				initialData.gender === "Masculino"
					? "M"
					: initialData.gender === "Femenino"
						? "F"
						: "O",
			);
			setValue("enrolment_num", initialData.enrolmentNum);
		}
	}, [initialData, setValue]);

	function handleClose() {
		reset();
		onClose();
	}

	const onSubmit = async (formValues) => {
		const ok = await confirm({
			title: "¿Actualizar estudiante?",
			description: `Se actualizarán los datos de ${formValues.first_name} ${formValues.last_name}.`,
			confirmLabel: "Sí, actualizar",
		});

		if (!ok) {
			onClose();
			return;
		}

		toast.promise(mutateStudent({ id: initialData.id, data: formValues }), {
			loading: "Actualizando estudiante...",
			success: (data) => {
				handleClose();
				return data?.message ?? "Estudiante actualizado con éxito!";
			},
			error: (err) => {
				onClose();
				return err?.message ?? "No se pudo actualizar el estudiante";
			},
		});
	};

	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={handleClose}
				title="Editar estudiante"
				description="Actualiza los datos del estudiante."
				formId={formId}
				submitLabel="Actualizar"
				isLoading={isPending}
			>
				<form
					id={formId}
					onSubmit={handleSubmit(onSubmit)}
					className="w-full flex flex-col gap-2"
				>
					<InputField
						type="file"
						accept="image/*"
						name="photo"
						register={register}
						error={errors}
					>
						Foto (opcional)
					</InputField>

					<InputField
						type="text"
						placeholder="0912345678"
						name="national_id_number"
						register={register}
						error={errors}
					>
						Número de cédula
					</InputField>

					<div className="grid grid-cols-2 gap-2">
						<InputField
							type="text"
							placeholder="Juan"
							name="first_name"
							register={register}
							error={errors}
						>
							Nombres
						</InputField>

						<InputField
							type="text"
							placeholder="Pérez"
							name="last_name"
							register={register}
							error={errors}
						>
							Apellidos
						</InputField>
					</div>

					<InputField
						type="date"
						name="date_of_birth"
						register={register}
						error={errors}
					>
						Fecha de nacimiento
					</InputField>

					<div className="grid grid-cols-2 gap-2">
						<SelectField
							name="blood_type"
							options={bloodTypeOptions}
							register={register}
							error={errors}
						>
							Tipo de sangre
						</SelectField>

						<SelectField
							name="gender"
							options={genderOptions}
							register={register}
							error={errors}
						>
							Género
						</SelectField>
					</div>

					<InputField
						type="text"
						placeholder="STU-2024-001"
						name="enrolment_num"
						register={register}
						error={errors}
					>
						Número de matrícula
					</InputField>
				</form>
			</Modal>

			<ConfirmationUI />
		</>
	);
}

export default UpdateStudentModal;
