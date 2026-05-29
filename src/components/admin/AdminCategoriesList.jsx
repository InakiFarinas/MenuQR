import { useState } from "react";
import { IconGripVertical, IconPlus, IconTrash } from "@tabler/icons-react";
import AddCard from "@/components/ui/AddCard";
import AdminToggle from "./AdminToggle.jsx";
import AddCategoryModal from "./AddCategoryModal.jsx";
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
	const { draggedId, overId, getDragHandleProps, getDropTargetProps } =
		useDragReorder((fromCategoryId, toCategoryId) => {
			reorderCategory(
				restaurant.id,
				activeMenuId,
				fromCategoryId,
				toCategoryId,
			);
		});

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
							onClick={() => onSelectCategory(category.id)}
							className={`flex cursor-pointer items-center gap-3 rounded-[1.25rem] border border-black/5 bg-white/90 p-4 transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(15,23,42,0.06)] ${
								draggedId === category.id
									? "scale-[1.01] opacity-60 ring-2 ring-emerald-500/30 shadow-[0_16px_32px_rgba(16,185,129,0.12)]"
									: overId === category.id
										? "ring-2 ring-emerald-500/20 bg-emerald-50/70"
										: ""
							}`}
							{...getDropTargetProps(category.id)}
						>
							<button
								type="button"
								className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-gray-400 transition hover:bg-black/3 hover:text-gray-950 active:cursor-grabbing"
								{...getDragHandleProps(category.id)}
							>
								<IconGripVertical size={18} stroke={1.8} />
							</button>

							<div className="flex-1">
								<h3 className="text-lg text-gray-950">{category.name}</h3>
								<p className="text-sm text-gray-600">
									{dishCount} plato{dishCount !== 1 ? "s" : ""}
								</p>
							</div>

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
					addCategory(restaurant.id, activeMenuId, onSelectCategory, data)
				}
			/>
		</div>
	);
}
