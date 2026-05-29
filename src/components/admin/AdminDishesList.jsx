import { AdminToggle } from ".";
import {
	IconEdit,
	IconGripVertical,
	IconPlus,
	IconTrash,
} from "@tabler/icons-react";
import useDragReorder from "../../hooks/useDragReorder.js";
import AddCard from "@/components/ui/AddCard";
import DishCard from "@/components/menu/DishCard";

export default function AdminDishesList({
	restaurant,
	activeMenuId,
	activeCategoryId,
	onEditDish,
	addDish,
	updateDishField,
	reorderDish,
	removeDish,
}) {
	const activeMenu = restaurant.menus.find((m) => m.id === activeMenuId);
	const activeCategory = activeMenu?.categories.find(
		(c) => c.id === activeCategoryId,
	);
	const { draggedId, overId, getDragHandleProps, getDropTargetProps } =
		useDragReorder((fromDishId, toDishId) => {
			reorderDish(
				restaurant.id,
				activeMenuId,
				activeCategoryId,
				fromDishId,
				toDishId,
			);
		});

	if (!activeMenu || !activeCategory) return null;

	return (
		<div className="space-y-4">
			<h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-gray-500">
				Platos
			</h3>

			<div className="space-y-3">
				{activeCategory.dishes?.map((dish) => (
					<div
						key={dish.id}
						className={`rounded-3xl border border-black/5 bg-white/90 p-4 transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(15,23,42,0.06)] sm:p-6 ${
							draggedId === dish.id
								? "scale-[1.01] opacity-60 ring-2 ring-emerald-500/30 shadow-[0_16px_32px_rgba(16,185,129,0.12)]"
								: overId === dish.id
									? "ring-2 ring-emerald-500/20 bg-emerald-50/70"
									: ""
						}`}
						{...getDropTargetProps(dish.id)}
					>
						<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
							<div className="flex items-start gap-3 sm:items-center sm:gap-4">
								<button
									type="button"
									className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-gray-400 transition hover:bg-black/3 hover:text-gray-950 active:cursor-grabbing"
									aria-label={`Arrastrar ${dish.name}`}
									{...getDragHandleProps(dish.id)}
								>
									<IconGripVertical size={19} stroke={1.8} />
								</button>

								<div className="min-w-0 flex-1">
									<DishCard
										dish={dish}
										isActive={dish.available !== false}
										compact
									/>
								</div>
							</div>

							<div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end sm:justify-start sm:gap-3">
								<AdminToggle
									checked={dish.available !== false}
									onChange={(val) => {
										updateDishField(
											restaurant.id,
											activeMenuId,
											activeCategoryId,
											dish.id,
											"available",
											val,
										);
									}}
									onClick={(e) => e.stopPropagation()}
									className="scale-95 sm:scale-100"
								/>

								<div className="flex items-center gap-2">
									{dish.available === false && (
										<span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-400">
											No disponible
										</span>
									)}
									<button
										onClick={() => onEditDish(dish)}
										className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-amber-700 transition hover:bg-amber-100"
										aria-label={`Editar ${dish.name}`}
									>
										<IconEdit size={17} stroke={1.8} />
									</button>
									<button
										onClick={() => {
											removeDish(
												restaurant.id,
												activeMenuId,
												activeCategoryId,
												dish.id,
											);
										}}
										className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-red-200 bg-red-50 text-red-700 transition hover:bg-red-100"
										aria-label={`Eliminar ${dish.name}`}
									>
										<IconTrash size={17} stroke={1.8} />
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
				<AddCard
					title="Agregar plato"
					subtitle="Agrega un nuevo plato a esta categoría"
					onClick={() => addDish(restaurant.id, activeMenuId, activeCategoryId)}
					RightIcon={IconPlus}
				/>
			</div>
		</div>
	);
}
