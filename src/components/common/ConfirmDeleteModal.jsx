import {
	Dialog,
	DialogPanel,
	DialogTitle,
	Description,
} from "@headlessui/react";

export default function ConfirmDeleteModal({
	isOpen,
	onConfirm,
	onCancel,
	title = "Confirmar eliminación",
	message = "¿Estás seguro de que deseas eliminar esto?",
}) {
	return (
		<Dialog
			open={isOpen}
			onClose={onCancel}
			className="relative z-50 focus:outline-none"
		>
			<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
				<DialogPanel className="bg-white rounded-[1.75rem] border border-black/5 p-6 max-w-sm w-full mx-4 shadow-[0_24px_80px_rgba(15,23,42,0.15)] duration-200 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0">
					<DialogTitle className="text-xl font-semibold text-gray-950 mb-2">
						{title}
					</DialogTitle>
					<Description className="text-sm text-gray-500 mb-6">
						{message}
					</Description>
					<div className="flex gap-3">
						<button
							onClick={onCancel}
							className="flex-1 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-medium text-gray-950 transition hover:bg-black/3"
						>
							Cancelar
						</button>
						<button
							onClick={onConfirm}
							className="flex-1 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 transition hover:bg-red-100"
						>
							Eliminar
						</button>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	);
}
