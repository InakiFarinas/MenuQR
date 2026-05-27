import { useState } from "react";
import { IconDeviceFloppy, IconTrash, IconX } from "@tabler/icons-react";

export default function DishEditModal({ dish, onClose, onSave, onDelete }) {
	const [formData, setFormData] = useState({
		name: dish?.name || "",
		description: dish?.description || "",
		price: dish?.price || "",
		available: dish?.available !== false,
		image: dish?.image || "",
	});

	const handleChange = (field, value) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSave = () => {
		onSave(formData);
	};

	return (
		<div
			className="fixed inset-0 z-40 bg-black/35 backdrop-blur-sm"
			onClick={onClose}
		>
			<div
				className="fixed bottom-0 left-0 right-0 z-50 max-h-[90vh] overflow-y-auto rounded-t-[1.75rem] border-t border-black/5 bg-white/95 shadow-[0_-24px_60px_rgba(15,23,42,0.16)]"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="sticky top-0 flex justify-center border-b border-black/5 bg-white/95 px-6 py-3">
					<div className="h-1.5 w-14 rounded-full bg-black/10" />
				</div>

				<div className="space-y-6 p-6 sm:p-8">
					<div>
						<label className="mb-2 block text-sm font-medium text-gray-900">
							Imagen
						</label>
						<input
							type="text"
							placeholder="URL de la imagen"
							value={formData.image}
							onChange={(e) => handleChange("image", e.target.value)}
							className="w-full rounded-2xl border border-black/10 bg-black/2 px-4 py-3 text-gray-950 focus:outline-none focus:ring-4 focus:ring-black/5"
						/>
						{formData.image && (
							<img
								src={formData.image}
								alt="preview"
								className="mt-3 h-40 w-full rounded-[1.25rem] object-cover"
							/>
						)}
					</div>

					<div>
						<label className="mb-2 block text-sm font-medium text-gray-900">
							Nombre
						</label>
						<input
							type="text"
							value={formData.name}
							onChange={(e) => handleChange("name", e.target.value)}
							className="w-full rounded-2xl border border-black/10 bg-black/2 px-4 py-3 text-gray-950 focus:outline-none focus:ring-4 focus:ring-black/5"
						/>
					</div>

					<div>
						<label className="mb-2 block text-sm font-medium text-gray-900">
							Descripción
						</label>
						<textarea
							value={formData.description}
							onChange={(e) => handleChange("description", e.target.value)}
							className="h-24 w-full resize-none rounded-2xl border border-black/10 bg-black/2 px-4 py-3 text-gray-950 focus:outline-none focus:ring-4 focus:ring-black/5"
						/>
					</div>

					<div>
						<label className="mb-2 block text-sm font-medium text-gray-900">
							Precio
						</label>
						<input
							type="number"
							step="0.01"
							value={formData.price}
							onChange={(e) =>
								handleChange("price", parseFloat(e.target.value))
							}
							className="w-full rounded-2xl border border-black/10 bg-black/2 px-4 py-3 text-gray-950 focus:outline-none focus:ring-4 focus:ring-black/5"
						/>
					</div>

					<div className="flex items-center justify-between rounded-2xl border border-black/5 bg-black/2 p-4">
						<span className="text-sm font-medium text-gray-900">
							Disponible
						</span>
						<label className="flex items-center">
							<input
								type="checkbox"
								checked={formData.available}
								onChange={(e) => handleChange("available", e.target.checked)}
								className="h-5 w-5 rounded border-black/20"
							/>
						</label>
					</div>

					<div className="space-y-3 border-t border-black/5 pt-6">
						<button
							onClick={handleSave}
							className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
						>
							<IconDeviceFloppy size={16} stroke={1.8} />
							Guardar cambios
						</button>

						<button
							onClick={onClose}
							className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-medium text-gray-950 transition hover:bg-black/3"
						>
							<IconX size={16} stroke={1.8} />
							Cancelar
						</button>

						<button
							onClick={onDelete}
							className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 transition hover:bg-red-100"
						>
							<IconTrash size={16} stroke={1.8} />
							Eliminar plato
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
