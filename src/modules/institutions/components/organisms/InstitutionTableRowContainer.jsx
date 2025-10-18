import useUnaffiliateInstitution from "@modules/institutions/hooks/useUnaffiliateInstitution";
import {
	LuClipboardMinus,
	LuClipboardPenLine,
	LuClipboardX,
	LuPencilRuler,
} from "react-icons/lu";
import { toast } from "sonner";
import InstitutionTableRow from "../organisms/InstitutionTableRow";

function InstitutionTableRowContainer({ data, confirm, onEdit }) {
	const { mutateAsync: unaffiliateInstitution } = useUnaffiliateInstitution();

	const handleUnaffiliate = async () => {
		const ok = await confirm({
			title: "¿Desafiliar unidad educativa?",
			description: `¿Estás seguro de desafiliar a la unidad ${data.name}?`,
			confirmLabel: "Sí, desafiliar",
		});

		if (!ok) return;

		toast.promise(unaffiliateInstitution(data.id), {
			loading: "Desafiliando unidad educativa…",
			success: "Unidad educativa desafiliada correctamente.",
			error: (err) => err?.message ?? "No se pudo desafiliar",
		});
	};

	const handleSanction = async () => {
		const ok = await confirm({
			title: "¿Sancionar unidad educativa?",
			description: `¿Estás seguro de sancionar a la unidad ${data.name}?`,
			confirmLabel: "Sí, sancionar",
		});

		if (!ok) return;

		toast.promise(unaffiliateInstitution(data.id), {
			loading: "Sancionando unidad educativa…",
			success: "Unidad educativa sancionada correctamente.",
			error: (err) => err?.message ?? "No se pudo sancionar",
		});
	};

	const actions = [
		{ label: "Editar", onClick: () => onEdit?.(data), icon: LuPencilRuler },
	];
	if (data.isActive) {
		actions.push(
			{
				label: "Desafiliar",
				onClick: handleUnaffiliate,
				icon: LuClipboardMinus,
				danger: true,
			},
			{
				label: "Sancionar",
				onClick: handleSanction,
				icon: LuClipboardX,
				danger: true,
			},
		);
	} else {
		actions.push({
			label: "Reafiliar",
			onClick: handleSanction,
			icon: LuClipboardPenLine,
		});
	}

	return <InstitutionTableRow data={data} actions={actions} />;
}

export default InstitutionTableRowContainer;
