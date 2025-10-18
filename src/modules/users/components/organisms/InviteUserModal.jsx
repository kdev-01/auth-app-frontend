import { InputField, Modal, SelectField } from "@globals/components";
import { useApiQuery, useConfirmDialog } from "@globals/hooks";
import { normalizeOptions } from "@globals/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import useInviteUser from "@modules/users/hooks/useInviteUser";
import { getAllRoles } from "@modules/users/services/userService";
import { userInvitationValidation } from "@modules/users/utils/userInvitationValidations";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ExtraFields from "../molecules/ExtraFields";

function InviteUserModal({ isOpen, onClose }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
	} = useForm({
		resolver: zodResolver(userInvitationValidation),
	});
	const { data: roles = [], isLoading } = useApiQuery({
		key: ["roles"],
		queryFn: getAllRoles,
		time: 10,
		select: normalizeOptions,
	});
	const { mutateAsync: mutateUser, isPending } = useInviteUser();
	const { confirm, ConfirmationUI } = useConfirmDialog();
	const formId = "inviteUserForm";
	const selectedRole = watch("role_id");

	function handleClose() {
		reset();
		onClose();
	}

	const onSubmit = async (formValues) => {
		const ok = await confirm({
			title: "¿Enviar invitación?",
			description: `Se enviará una invitación a ${formValues.email}.`,
			confirmLabel: "Sí, enviar",
		});

		if (!ok) {
			onClose();
			return;
		}

		toast.promise(mutateUser(formValues), {
			loading: "Enviando invitación...",
			success: (data) => {
				handleClose();
				return data?.message ?? "Invitación enviada!";
			},
			error: (err) => {
				onClose();
				return err?.message ?? "No se pudo enviar la invitación";
			},
		});
	};

	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={handleClose}
				title="Enviar invitación"
				description="Envía una invitación por email para que el usuario se registre en el sistema."
				formId={formId}
				submitLabel="Enviar"
				isLoading={isPending}
			>
				<form
					id={formId}
					onSubmit={handleSubmit(onSubmit)}
					className="w-full flex flex-col"
				>
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

					<SelectField
						name="role_id"
						options={roles}
						isLoading={isLoading}
						register={register}
						error={errors}
					>
						Rol
					</SelectField>

					<ExtraFields
						selectedRole={selectedRole}
						roles={roles}
						register={register}
						error={errors}
					/>
				</form>
			</Modal>

			<ConfirmationUI />
		</>
	);
}

export default InviteUserModal;
