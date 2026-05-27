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
				<DialogPanel
					transition
					className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 duration-200 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
				>
					<DialogTitle className="text-lg font-bold text-gray-900 mb-2">
						{title}
					</DialogTitle>
					<Description className="text-gray-600 text-sm mb-6">
						{message}
					</Description>
					<div className="flex gap-3">
						<button
							onClick={onCancel}
							className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded font-semibold hover:bg-gray-300 transition-colors"
						>
							Cancelar
						</button>
						<button
							onClick={onConfirm}
							className="flex-1 px-4 py-2 bg-red-600 text-white rounded font-semibold hover:bg-red-700 transition-colors"
						>
							Eliminar
						</button>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	);
}
