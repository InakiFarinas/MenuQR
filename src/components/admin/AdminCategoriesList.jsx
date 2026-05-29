import { useState } from "react";
import {
	IconEdit,
	IconGripVertical,
	IconPlus,
	IconTrash,
} from "@tabler/icons-react";
import AddCard from "@/components/ui/AddCard";
import AdminToggle from "./AdminToggle.jsx";
import ActionButton from "@/components/ui/ActionButton";
import AddCategoryModal from "./AddCategoryModal.jsx";
import { Field, FieldContent } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useDragReorder from "../../hooks/useDragReorder.js";

export default function AdminCategoriesList({
	restaurant,
	activeMenuId,
	onSelectCategory,
	addCategory,
	removeCategory,
	updateCategoryField,
	reorderCategory,
}) {
	const activeMenu = restaurant.menus.find((m) => m.id === activeMenuId);
	const [addModalOpen, setAddModalOpen] = useState(false);
	const [editingCategoryId, setEditingCategoryId] = useState(null);
	const [draftName, setDraftName] = useState("");

	const { draggedId, overId, getDragHandleProps, getDropTargetProps } =
		useDragReorder((fromCategoryId, toCategoryId) => {
			reorderCategory(
				restaurant.id,
				activeMenuId,
				fromCategoryId,
				toCategoryId,
			);
		});

	function startEditing(category) {
		setEditingCategoryId(category.id);
		setDraftName(category.name);
	}

	function stopEditing() {
		setEditingCategoryId(null);
		setDraftName("");
	}

	function commitEditing(categoryId) {
		const trimmedName = draftName.trim();
		updateCategoryField(
			restaurant.id,
			activeMenuId,
			categoryId,
			"name",
			trimmedName || "Nueva categoría",
		);
		stopEditing();
	}

	if (!activeMenu) return null;

	return (
		<div className="space-y-4">
			<div className="mb-4 flex items-center justify-between">
				<h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-gray-500">
					Categorías
				</h3>
			</div>

			<div className="space-y-3">
				{activeMenu.categories.map((category) => {
					const dishCount = category.dishes?.length || 0;

					return (
						<div
							key={category.id}
							onClick={() => {
								if (editingCategoryId !== category.id) {
									onSelectCategory(category.slug);
								}
							}}
							className={`flex cursor-pointer flex-col items-stretch gap-2 rounded-[1.25rem] border border-black/5 bg-white/90 p-3 transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(15,23,42,0.06)] sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:p-4 ${
								draggedId === category.id
									? "scale-[1.01] opacity-60 ring-2 ring-emerald-500/30 shadow-[0_16px_32px_rgba(16,185,129,0.12)]"
									: overId === category.id
										? "ring-2 ring-emerald-500/20 bg-emerald-50/70"
										: ""
							}`}
							{...getDropTargetProps(category.id)}
						>
							<div className="flex items-start gap-3 sm:flex-1 sm:items-center">
								<button
									type="button"
									className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-gray-400 transition hover:bg-black/3 hover:text-gray-950 active:cursor-grabbing"
									{...getDragHandleProps(category.id)}
								>
									<IconGripVertical size={18} stroke={1.8} />
								</button>

								<div className="min-w-0 flex-1">
									{editingCategoryId === category.id ? (
										<Field orientation="horizontal">
											<FieldContent>
												<Input
													autoFocus
													type="text"
													value={draftName}
													onClick={(e) => e.stopPropagation()}
													onChange={(e) => setDraftName(e.target.value)}
													onBlur={() => commitEditing(category.id)}
													onKeyDown={(e) => {
														if (e.key === "Enter") {
															e.preventDefault();
															commitEditing(category.id);
														}
														if (e.key === "Escape") {
															e.preventDefault();
															stopEditing();
														}
													}}
													aria-label="Editar nombre de categoría"
												/>
											</FieldContent>
										</Field>
									) : (
										<h3 className="text-base font-medium text-gray-950 sm:text-lg">
											{category.name}
										</h3>
									)}
									<p className="text-sm text-gray-600">
										{dishCount} plato{dishCount !== 1 ? "s" : ""}
									</p>
								</div>
							</div>

							<div className="flex items-center justify-between gap-3 sm:min-w-[16rem] sm:justify-end sm:gap-4">
								<p className="whitespace-nowrap text-sm text-gray-600 sm:text-right">
									{dishCount} plato{dishCount !== 1 ? "s" : ""}
								</p>
								<div className="flex items-center gap-2">
									<AdminToggle
										checked={category.available !== false}
										onChange={(val) => {
											updateCategoryField(
												restaurant.id,
												activeMenuId,
												category.id,
												"available",
												val,
											);
										}}
										onClick={(e) => e.stopPropagation()}
									/>

									<ActionButton
										type="edit"
										icon={IconEdit}
										onClick={(e) => {
											e.stopPropagation();
											if (editingCategoryId === category.id) {
												commitEditing(category.id);
											} else {
												startEditing(category);
											}
										}}
										aria-label={
											editingCategoryId === category.id
												? "Guardar nombre"
												: "Editar nombre"
										}
									/>

									<button
										onClick={(e) => {
											e.stopPropagation();
											removeCategory(category.id);
										}}
										className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-red-200 bg-red-50 text-red-700 transition hover:bg-red-100"
									>
										<IconTrash size={16} stroke={1.8} />
									</button>
								</div>
							</div>
						</div>
					);
				})}
				<AddCard
					title="Agregar categoría"
					subtitle="Agrega una nueva categoría a este menú"
					onClick={() => setAddModalOpen(true)}
					RightIcon={IconPlus}
				/>
			</div>

			<AddCategoryModal
				isOpen={addModalOpen}
				onClose={() => setAddModalOpen(false)}
				onAdd={(data) =>
					addCategory(restaurant.id, activeMenuId, () => {}, data)
				}
			/>
		</div>
	);
}
