import { useState } from "react";
import { IconEdit, IconPlus, IconQrcode, IconTrash } from "@tabler/icons-react";
import AddCard from "@/components/ui/AddCard";
import ActionButton from "@/components/ui/ActionButton";
import { Field, FieldContent } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import QRModal from "./QRModal.jsx";
import AddMenuModal from "./AddMenuModal.jsx";

export default function AdminMenusList({
	restaurant,
	onSelectMenu,
	onAddMenu,
	updateMenuField,
	removeMenu,
}) {
	const [editingMenuId, setEditingMenuId] = useState(null);
	const [draftName, setDraftName] = useState("");
	const [qrMenu, setQrMenu] = useState(null);
	const [addModalOpen, setAddModalOpen] = useState(false);

	function startEditing(menu) {
		setEditingMenuId(menu.id);
		setDraftName(menu.name);
	}

	function stopEditing() {
		setEditingMenuId(null);
		setDraftName("");
	}

	function commitEditing(menuId) {
		const trimmedName = draftName.trim();
		updateMenuField?.(
			restaurant.id,
			menuId,
			"name",
			trimmedName || "Nueva Carta",
		);
		stopEditing();
	}

	const qrUrl = qrMenu
		? `${window.location.origin}/${restaurant.slug}/${qrMenu.slug}`
		: "";

	return (
		<>
			<div className="space-y-4">
				<div className="space-y-3">
					{restaurant.menus.map((menu) => {
						const dishCount = menu.categories.reduce(
							(sum, cat) => sum + cat.dishes.length,
							0,
						);
						const categoryCount = menu.categories.length;

						return (
							<div
								key={menu.id}
								onClick={() => onSelectMenu(menu.slug)}
								className="flex cursor-pointer flex-col items-stretch gap-2 rounded-[1.25rem] border border-black/5 bg-white/90 p-3 transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(15,23,42,0.06)] sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-4"
							>
								<div className="min-w-0 flex-1">
									{editingMenuId === menu.id ? (
										<Field orientation="horizontal">
											<FieldContent>
												<Input
													autoFocus
													type="text"
													value={draftName}
													onClick={(e) => e.stopPropagation()}
													onChange={(e) => setDraftName(e.target.value)}
													onBlur={() => commitEditing(menu.id)}
													onKeyDown={(e) => {
														if (e.key === "Enter") {
															e.preventDefault();
															commitEditing(menu.id);
														}
														if (e.key === "Escape") {
															e.preventDefault();
															stopEditing();
														}
													}}
													aria-label="Editar nombre del menú"
												/>
											</FieldContent>
										</Field>
									) : (
										<>
											<h3 className="text-base font-medium text-gray-950 sm:text-lg">
												{menu.name}
											</h3>
											{menu.description ? (
												<p className="mt-0.5 max-w-xs truncate text-sm text-gray-500 sm:max-w-md">
													{menu.description}
												</p>
											) : null}
										</>
									)}
								</div>
								<div className="flex items-center justify-between gap-3 sm:min-w-[15rem] sm:justify-end sm:gap-4">
									<p className="whitespace-nowrap text-sm text-gray-600 sm:text-right">
										{categoryCount} categoría{categoryCount !== 1 ? "s" : ""} ·{" "}
										{dishCount} plato{dishCount !== 1 ? "s" : ""}
									</p>
									<div className="flex items-center gap-2">
										<ActionButton
											type="qr"
											icon={IconQrcode}
											onClick={(e) => {
												e.stopPropagation();
												setQrMenu({ name: menu.name, slug: menu.slug });
											}}
											aria-label="Ver QR del menú"
										/>
										<ActionButton
											type="edit"
											icon={IconEdit}
											onClick={(e) => {
												e.stopPropagation();
												if (editingMenuId === menu.id) {
													commitEditing(menu.id);
												} else {
													startEditing(menu);
												}
											}}
											aria-label={
												editingMenuId === menu.id
													? "Guardar nombre"
													: "Editar nombre"
											}
										/>
										<ActionButton
											type="delete"
											icon={IconTrash}
											onClick={(e) => {
												e.stopPropagation();
												if (editingMenuId === menu.id) {
													stopEditing();
												}
												removeMenu(menu.id);
											}}
											aria-label="Eliminar menú"
										/>
									</div>
								</div>
							</div>
						);
					})}
				</div>

				<AddCard
					title="Agregar menú"
					subtitle="Crear nuevo menú y categorías"
					onClick={() => setAddModalOpen(true)}
					RightIcon={IconPlus}
				/>
			</div>

			{qrMenu && (
				<QRModal
					menuName={qrMenu.name}
					url={qrUrl}
					onClose={() => setQrMenu(null)}
				/>
			)}

			<AddMenuModal
				isOpen={addModalOpen}
				onClose={() => setAddModalOpen(false)}
				onAdd={(data) => onAddMenu(data)}
			/>
		</>
	);
}
