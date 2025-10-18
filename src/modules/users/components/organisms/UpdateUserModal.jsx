import { InputField, Modal } from "@globals/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { userUpdateValidation } from "@modules/users/utils/userUpdateValidation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function UpdateUserModal({ isOpen, onClose, initialData }) {
	const formId = "updateUserForm";

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: zodResolver(userUpdateValidation),
	});

	useEffect(() => {
		if (isOpen && initialData) {
			reset({
				national_id_number: initialData.nationalID ?? "",
				email: initialData.email ?? "",
				first_name: initialData.firstName ?? "",
				last_name: initialData.lastName ?? "",
				phone_number: initialData.phone ?? "",
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
			title="Editar usuario"
			description="Modifica la información del usuario en el sistema."
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
					placeholder="1234567890"
					name="national_id_number"
					register={register}
					error={errors}
				>
					Cédula de identidad
				</InputField>

				<InputField
					type="text"
					placeholder="nombre.apellido@gmail.com"
					name="email"
					register={register}
					error={errors}
				>
					Correo electrónico
				</InputField>

				<InputField
					type="text"
					placeholder="Kevin"
					name="first_name"
					register={register}
					error={errors}
				>
					Nombre
				</InputField>

				<InputField
					type="text"
					placeholder="Tapia"
					name="last_name"
					register={register}
					error={errors}
				>
					Apellido
				</InputField>

				<InputField
					type="text"
					placeholder="0984735678"
					name="phone_number"
					register={register}
					error={errors}
				>
					Teléfono
				</InputField>
			</form>
		</Modal>
	);
}

export default UpdateUserModal;
