import { useRef, useState } from "react";
import { IconBuildingStore, IconLoader2, IconPlus } from "@tabler/icons-react";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	AvatarBadge,
} from "@/components/ui/avatar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { uploadImage } from "../../../services/storageService.js";

export default function LocalPage({
	selectedRestaurant,
	updateRestaurantField,
	onBack,
}) {
	const avatarInputRef = useRef(null);
	const [isUploading, setIsUploading] = useState(false);
	const [uploadError, setUploadError] = useState("");

	const restaurantInitials = selectedRestaurant.name
		.split(" ")
		.map((word) => word[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();

	function handleAvatarClick() {
		avatarInputRef.current?.click();
	}

	async function handleAvatarUpload(event) {
		const file = event.target.files?.[0];
		if (!file) return;

		setIsUploading(true);
		setUploadError("");

		const path = `${selectedRestaurant.id}/avatar`;
		const { url, error } = await uploadImage(file, "avatars", path);

		if (error) {
			setUploadError("No se pudo subir la imagen. Intentá de nuevo.");
		} else {
			updateRestaurantField(selectedRestaurant.id, "avatarImage", url);
		}

		setIsUploading(false);
		event.target.value = "";
	}

	return (
		<div>
			<div className="border-b border-black/5 px-5 py-5 sm:px-6 sm:py-6">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<button
									type="button"
									onClick={onBack}
									className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-950"
								>
									Volver a ajustes
								</button>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>Información del local</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<div className="mt-4 flex items-center gap-3">
					<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black/5 text-gray-900">
						<IconBuildingStore size={18} stroke={1.8} />
					</div>
					<div>
						<h3 className="text-2xl font-semibold text-gray-950 sm:text-3xl">
							Información del local
						</h3>
						<p className="mt-1 text-sm text-gray-500 sm:text-base">
							Edita el nombre, la URL y la descripción del restaurante.
						</p>
					</div>
				</div>
			</div>
			<div className="space-y-6 px-5 py-5 sm:px-6 sm:py-6">
				<div className="rounded-[1.25rem] border border-black/5 bg-black/2 p-4 sm:p-6">
					<div className="flex items-center gap-4">
						<button
							type="button"
							onClick={handleAvatarClick}
							disabled={isUploading}
							aria-label="Subir avatar"
						>
							<Avatar size="lg">
								<AvatarImage
									src={selectedRestaurant.avatarImage || ""}
									alt={selectedRestaurant.name}
								/>
								<AvatarFallback className="h-full w-full bg-white/10 text-sm font-semibold tracking-[0.2em] text-white">
									{restaurantInitials}
								</AvatarFallback>
								<AvatarBadge>
									{isUploading ? (
										<IconLoader2 size={14} className="animate-spin" />
									) : (
										<IconPlus />
									)}
								</AvatarBadge>
							</Avatar>
						</button>
						<input
							ref={avatarInputRef}
							type="file"
							accept="image/*"
							className="hidden"
							onChange={handleAvatarUpload}
						/>
						<div className="min-w-0">
							<p className="text-sm font-semibold uppercase tracking-[0.22em] text-gray-500">
								Avatar público
							</p>
							<p className="mt-1 text-sm text-gray-600">
								{isUploading
									? "Subiendo imagen..."
									: "Hacé clic en el avatar para subir una imagen."}
							</p>
							{uploadError && (
								<p className="mt-1 text-sm text-red-600">{uploadError}</p>
							)}
						</div>
					</div>
				</div>
				<div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
					<div>
						<label className="mb-2 block text-sm font-medium text-gray-900">
							Nombre del local
						</label>
						<input
							type="text"
							value={selectedRestaurant.name}
							onChange={(e) =>
								updateRestaurantField(
									selectedRestaurant.id,
									"name",
									e.target.value,
								)
							}
							className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-gray-950 shadow-sm focus:outline-none focus:ring-4 focus:ring-black/5 sm:text-base"
						/>
					</div>
				</div>
				<div>
					<label className="mb-2 block text-sm font-medium text-gray-900">
						Descripción
					</label>
					<textarea
						value={selectedRestaurant.description}
						onChange={(e) =>
							updateRestaurantField(
								selectedRestaurant.id,
								"description",
								e.target.value,
							)
						}
						rows="3"
						className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-gray-950 shadow-sm focus:outline-none focus:ring-4 focus:ring-black/5"
					/>
				</div>
				<div>
					<label className="mb-2 block text-sm font-medium text-gray-900">
						Imagen de fondo del avatar
					</label>
					<input
						type="url"
						value={selectedRestaurant.avatarBackgroundImage || ""}
						onChange={(e) =>
							updateRestaurantField(
								selectedRestaurant.id,
								"avatarBackgroundImage",
								e.target.value,
							)
						}
						placeholder="https://..."
						className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-gray-950 shadow-sm focus:outline-none focus:ring-4 focus:ring-black/5 sm:text-base"
					/>
					<p className="mt-2 text-xs text-gray-500">
						Se muestra como fondo del avatar en el menú público.
					</p>
				</div>
			</div>
		</div>
	);
}
