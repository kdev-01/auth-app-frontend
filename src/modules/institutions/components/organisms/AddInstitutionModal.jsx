import { Modal } from "@globals/components";
import { InputField, SelectField } from "@globals/components";
import { useApiQuery, useConfirmDialog } from "@globals/hooks";
import { normalizeOptions } from "@globals/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import useAddInstitution from "@modules/institutions/hooks/useAddInstitution";
import { getAllCities } from "@modules/institutions/services/institutionService";
import { addInstitutionValidation } from "@modules/institutions/utils/addInstitutionValidation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function AddInstitutionModal({ isOpen, onClose }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: zodResolver(addInstitutionValidation),
	});
	const { data: cities = [], isLoading } = useApiQuery({
		key: ["cities"],
		queryFn: getAllCities,
		time: 10,
		select: normalizeOptions,
	});
	const { mutateAsync: mutateInstitution, isPending } = useAddInstitution();
	const { confirm, ConfirmationUI } = useConfirmDialog();
	const formId = "addInstitutionForm";

	function handleClose() {
		reset();
		onClose();
	}

	const onSubmit = async (formValues) => {
		const ok = await confirm({
			title: "¿Afiliar unidad educativa educativa?",
			description: `Se afilará "${formValues.name}" y quedará registrada en el sistema.`,
			confirmLabel: "Sí, registrar",
		});

		if (!ok) {
			onClose();
			return;
		}

		toast.promise(mutateInstitution(formValues), {
			loading: "Registrando institución...",
			success: (data) => {
				handleClose();
				return data?.message ?? "Institución afiliada con éxito!";
			},
			error: (err) => {
				onClose();
				return err?.message ?? "No se pudo registrar la institución";
			},
		});
	};

	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={handleClose}
				title="Registrar unidad educativa"
				description="Registra una unidad educativa en el sistema."
				formId={formId}
				submitLabel="Registrar"
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
				</form>
			</Modal>

			<ConfirmationUI />
		</>
	);
}

export default AddInstitutionModal;
