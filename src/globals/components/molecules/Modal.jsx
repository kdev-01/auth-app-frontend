import { useModalBehavior } from "@globals/hooks";
import { useRef } from "react";
import { LuX } from "react-icons/lu";
import { Button, IconButton, ModalBackdrop } from "../atoms";

function Modal({
	isOpen,
	onClose,
	children,
	title,
	description,
	formId,
	centered = true,
	showCloseButton = true,
	submitLabel,
	isLoading = false,
	size = "max-w-xl",
	zIndex = "z-50",
}) {
	const modalRef = useRef(null);
	useModalBehavior(isOpen, onClose);
	if (!isOpen) return null;

	return (
		<div
			className={`fixed inset-0 ${zIndex} ${centered ? "flex items-center justify-center" : ""}`}
		>
			<ModalBackdrop onClick={onClose} />
			<section
				role="dialog"
				aria-modal="true"
				ref={modalRef}
				className={`flex flex-col gap-8 relative ${size} w-full mx-auto bg-white rounded-xl shadow-lg p-6`}
			>
				{showCloseButton && (
					<IconButton
						icon={LuX}
						onClick={onClose}
						className="cursor-pointer absolute right-3 top-3 h-8 w-8 flex items-center justify-center rounded-full bg-gray-200"
					/>
				)}
				<header>
					<h1 className="font-bold text-xl">{title}</h1>
					<p className="text-gray-400">{description}</p>
				</header>

				<main>{children}</main>

				<footer className="flex flex-row-reverse gap-2">
					{submitLabel && (
						<Button form={formId} isLoading={isLoading} type="submit">
							{submitLabel}
						</Button>
					)}
					<Button onClick={onClose} className="bg-transparent text-neutral-500">
						Cerrar
					</Button>
				</footer>
			</section>
		</div>
	);
}

export default Modal;
