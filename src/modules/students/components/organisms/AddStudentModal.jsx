import { InputField, Modal, SelectField } from "@globals/components";
import { useConfirmDialog } from "@globals/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import useAddStudent from "@modules/students/hooks/useAddStudent";
import {
	bloodTypeOptions,
	genderOptions,
} from "@modules/students/data/studentSelectsData";
import { addStudentValidation } from "@modules/students/utils/addStudentValidation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function AddStudentModal({ isOpen, onClose }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: zodResolver(addStudentValidation),
	});

	const { mutateAsync: mutateStudent, isPending } = useAddStudent();
	const { confirm, ConfirmationUI } = useConfirmDialog();
	const formId = "addStudentForm";

	function handleClose() {
		reset();
		onClose();
	}

	const onSubmit = async (formValues) => {
		const ok = await confirm({
			title: "¿Registrar estudiante?",
			description: `Se registrará a ${formValues.first_name} ${formValues.last_name} en el sistema.`,
			confirmLabel: "Sí, registrar",
		});

		if (!ok) {
			onClose();
			return;
		}

		toast.promise(mutateStudent(formValues), {
			loading: "Registrando estudiante...",
			success: (data) => {
				handleClose();
				return data?.message ?? "Estudiante registrado con éxito!";
			},
			error: (err) => {
				onClose();
				return err?.message ?? "No se pudo registrar el estudiante";
			},
		});
	};

	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={handleClose}
				title="Registrar estudiante"
				description="Registra un nuevo estudiante en el sistema."
				formId={formId}
				submitLabel="Registrar"
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

export default AddStudentModal;
