import { useId } from "react";
import { Modal } from ".";

function ConfirmDialog({
	isOpen,
	onConfirm,
	onCancel,
	title = "¿Confirmar acción?",
	description = "Esta acción no se puede deshacer.",
	confirmLabel = "Aceptar",
	size = "max-w-md",
	loading = false,
}) {
	const formId = useId();

	return (
		<Modal
			isOpen={isOpen}
			onClose={onCancel}
			title={title}
			description={description}
			formId={formId}
			submitLabel={loading ? "Procesando..." : confirmLabel}
			size={size}
			zIndex="z-60"
		>
			<form
				id={formId}
				onSubmit={(e) => {
					e.preventDefault();
					if (!loading) onConfirm?.();
				}}
				className="w-full"
			></form>
		</Modal>
	);
}

export default ConfirmDialog;
