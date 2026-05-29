import { useCallback } from "react";
import supabase from "../lib/supabaseClient.js";
import { reorderArray } from "../utils/menu.js";
import { mapDishRow, persistMutation } from "../utils/restaurantMappers.js";
import * as restaurantMutations from "../utils/restaurantMutations.js";

export default function useDishActions({
	patchRestaurant,
	setRestaurants,
	getRestaurantById,
}) {
	const addDish = useCallback(
		(restaurantId, menuId, categoryId, dishData = {}) => {
			const dishName = dishData.name?.trim() || "Nuevo plato";
			const dishDescription =
				dishData.description?.trim() || "Edita esta descripción";
			const restaurant = getRestaurantById(restaurantId);
			const menu = restaurant?.menus.find((item) => item.id === menuId);
			const category = menu?.categories.find((item) => item.id === categoryId);

			if (!supabase) {
				setRestaurants((prev) =>
					restaurantMutations.addDish(
						prev,
						restaurantId,
						menuId,
						categoryId,
						dishData,
					),
				);
				return;
			}

			persistMutation("Failed to create dish", async () => {
				const { data, error } = await supabase
					.from("dishes")
					.insert([
						{
							categoria_id: categoryId,
							nombre: dishName,
							descripcion: dishDescription,
							precio: dishData.price ?? 0,
							disponible: true,
							imagen_url: dishData.image ?? "",
							orden: category?.dishes?.length ?? 0,
						},
					])
					.select("*")
					.single();

				if (error) throw error;
				if (!data) return;

				patchRestaurant(restaurantId, (currentRestaurant) => ({
					...currentRestaurant,
					menus: currentRestaurant.menus.map((currentMenu) =>
						currentMenu.id === menuId
							? {
									...currentMenu,
									categories: currentMenu.categories.map((currentCategory) =>
										currentCategory.id === categoryId
											? {
													...currentCategory,
													dishes: [...currentCategory.dishes, mapDishRow(data)],
												}
											: currentCategory,
									),
								}
							: currentMenu,
					),
				}));
			});
		},
		[patchRestaurant, setRestaurants, getRestaurantById],
	);

	const reorderDish = useCallback(
		(restaurantId, menuId, categoryId, fromDishId, toDishId) => {
			const restaurant = getRestaurantById(restaurantId);
			const menu = restaurant?.menus.find((item) => item.id === menuId);
			const category = menu?.categories.find((item) => item.id === categoryId);
			if (!category) return;

			const nextDishes = reorderArray(category.dishes, fromDishId, toDishId);

			setRestaurants((prev) =>
				restaurantMutations.reorderDish(
					prev,
					restaurantId,
					menuId,
					categoryId,
					fromDishId,
					toDishId,
				),
			);

			if (!supabase) return;

			persistMutation("Failed to persist dish order", async () => {
				const updates = nextDishes.map((dish, index) =>
					supabase.from("dishes").update({ orden: index }).eq("id", dish.id),
				);
				const results = await Promise.all(updates);
				const firstError = results.find((result) => result.error)?.error;
				if (firstError) throw firstError;
			});
		},
		[setRestaurants, getRestaurantById],
	);

	const updateDishField = useCallback(
		(restaurantId, menuId, categoryId, dishId, field, value) => {
			setRestaurants((prev) =>
				restaurantMutations.updateDishField(
					prev,
					restaurantId,
					menuId,
					categoryId,
					dishId,
					field,
					value,
				),
			);

			if (!supabase) return;

			const columnMap = {
				name: "nombre",
				description: "descripcion",
				price: "precio",
				image: "imagen_url",
				available: "disponible",
			};
			const column = columnMap[field];
			if (!column) return;

			persistMutation("Failed to persist dish field", async () => {
				const { error } = await supabase
					.from("dishes")
					.update({ [column]: value })
					.eq("id", dishId);
				if (error) throw error;
			});
		},
		[setRestaurants],
	);

	const removeDish = useCallback(
		(restaurantId, menuId, categoryId, dishId) => {
			setRestaurants((prev) =>
				restaurantMutations.removeDish(
					prev,
					restaurantId,
					menuId,
					categoryId,
					dishId,
				),
			);

			if (!supabase) return;

			persistMutation("Failed to delete dish", async () => {
				const { error } = await supabase
					.from("dishes")
					.delete()
					.eq("id", dishId);
				if (error) throw error;
			});
		},
		[setRestaurants],
	);

	return { addDish, reorderDish, updateDishField, removeDish };
}
