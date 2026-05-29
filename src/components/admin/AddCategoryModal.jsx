import { useState } from "react";
import { IconPlus, IconX } from "@tabler/icons-react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export default function AddCategoryModal({ isOpen, onClose, onAdd }) {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	function handleAdd() {
		const trimmedName = name.trim();
		if (!trimmedName) return;
		onAdd({ name: trimmedName, description: description.trim() });
		setName("");
		setDescription("");
		onClose();
	}

	function handleClose() {
		setName("");
		setDescription("");
		onClose();
	}

	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			className="relative z-50 focus:outline-none"
		>
			<div className="fixed inset-0 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
				<DialogPanel className="w-full max-w-sm rounded-[1.75rem] border border-black/5 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.15)] duration-200 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0">
					<div className="mb-6 flex items-center justify-between">
						<DialogTitle className="text-xl font-semibold text-gray-950">
							Nueva categoría
						</DialogTitle>
						<button
							type="button"
							onClick={handleClose}
							className="flex h-8 w-8 items-center justify-center rounded-xl bg-black/5 text-gray-600 transition hover:bg-black/10"
						>
							<IconX size={16} stroke={2} />
						</button>
					</div>

					<div className="space-y-4">
						<div>
							<label className="mb-2 block text-sm font-medium text-gray-900">
								Nombre
							</label>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								onKeyDown={(e) => e.key === "Enter" && handleAdd()}
								autoFocus
								placeholder="Ej: Entradas"
								className="w-full rounded-2xl border border-black/10 bg-black/2 px-4 py-3 text-sm text-gray-950 focus:outline-none focus:ring-4 focus:ring-black/5"
							/>
						</div>
						<div>
							<label className="mb-2 block text-sm font-medium text-gray-900">
								Descripción
							</label>
							<textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								rows="3"
								placeholder="Describe la sección aquí"
								className="w-full resize-none rounded-2xl border border-black/10 bg-black/2 px-4 py-3 text-sm text-gray-950 focus:outline-none focus:ring-4 focus:ring-black/5"
							/>
						</div>
					</div>

					<div className="mt-6 flex gap-3">
						<button
							type="button"
							onClick={handleClose}
							className="flex-1 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-medium text-gray-950 transition hover:bg-black/3"
						>
							Cancelar
						</button>
						<button
							type="button"
							onClick={handleAdd}
							disabled={!name.trim()}
							className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gray-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
						>
							<IconPlus size={16} stroke={2} />
							Agregar
						</button>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	);
}
