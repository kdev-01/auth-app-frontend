import { ConfirmDialog } from "@globals/components";
import { useCallback, useMemo, useState } from "react";

function useConfirmDialog() {
	const [state, setState] = useState({
		open: false,
		opts: {
			title: "¿Confirmar acción?",
			description: "Esta acción no se puede deshacer.",
			confirmLabel: "Aceptar",
			size: "max-w-md",
			loading: false,
		},
		resolver: null,
	});

	const confirm = useCallback((opts = {}) => {
		return new Promise((resolve) => {
			setState((prev) => ({
				open: true,
				opts: { ...prev.opts, ...opts },
				resolver: resolve,
			}));
		});
	}, []);

	const handleConfirm = useCallback(() => {
		state.resolver?.(true);
		setState((prev) => ({ ...prev, open: false, resolver: null }));
	}, [state.resolver]);

	const handleCancel = useCallback(() => {
		state.resolver?.(false);
		setState((prev) => ({ ...prev, open: false, resolver: null }));
	}, [state.resolver]);

	const ConfirmationUI = useMemo(() => {
		return function ConfirmationUIInner() {
			return (
				<ConfirmDialog
					isOpen={state.open}
					onConfirm={handleConfirm}
					onCancel={handleCancel}
					title={state.opts.title}
					description={state.opts.description}
					confirmLabel={state.opts.confirmLabel}
					size={state.opts.size}
					loading={state.opts.loading}
				/>
			);
		};
	}, [state.open, state.opts, handleConfirm, handleCancel]);

	return { confirm, ConfirmationUI };
}

export default useConfirmDialog;
