import { useCallback } from "react";
import supabase from "../lib/supabaseClient.js";
import { createId, reorderArray } from "../utils/menu.js";
import { mapCategoryRow, persistMutation } from "../utils/restaurantMappers.js";

export default function useCategoryActions({
	patchRestaurant,
	getRestaurantById,
}) {
	const addCategory = useCallback(
		(restaurantId, menuId, setActiveCategoryId, categoryData = {}) => {
			const categoryName = categoryData.name?.trim() || "Nueva categoría";
			const categoryDescription =
				categoryData.description?.trim() || "Describe la sección aquí";
			const restaurant = getRestaurantById(restaurantId);
			const menu = restaurant?.menus.find((item) => item.id === menuId);

			if (!supabase) {
				const categoryId = createId("cat");
				patchRestaurant(restaurantId, (currentRestaurant) => ({
					...currentRestaurant,
					menus: currentRestaurant.menus.map((currentMenu) =>
						currentMenu.id === menuId
							? {
									...currentMenu,
									categories: [
										...currentMenu.categories,
										{
											id: categoryId,
											name: categoryName,
											description: categoryDescription,
											available: true,
											dishes: [],
										},
									],
								}
							: currentMenu,
					),
				}));
				setActiveCategoryId(categoryId);
				return;
			}

			persistMutation("Failed to create category", async () => {
				const { data, error } = await supabase
					.from("categories")
					.insert([
						{
							menu_id: menuId,
							nombre: categoryName,
							descripcion: categoryDescription,
							activa: true,
							orden: menu?.categories?.length ?? 0,
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
									categories: [...currentMenu.categories, mapCategoryRow(data)],
								}
							: currentMenu,
					),
				}));
				setActiveCategoryId(data.id);
			});
		},
		[patchRestaurant, getRestaurantById],
	);

	const updateCategoryField = useCallback(
		(restaurantId, menuId, categoryId, field, value) => {
			patchRestaurant(restaurantId, (restaurant) => ({
				...restaurant,
				menus: restaurant.menus.map((menu) =>
					menu.id === menuId
						? {
								...menu,
								categories: menu.categories.map((category) =>
									category.id === categoryId
										? { ...category, [field]: value }
										: category,
								),
							}
						: menu,
				),
			}));

			if (!supabase) return;

			const columnMap = {
				available: "activa",
				name: "nombre",
				description: "descripcion",
			};
			const column = columnMap[field];
			if (!column) return;

			persistMutation("Failed to persist category field", async () => {
				const { error } = await supabase
					.from("categories")
					.update({ [column]: value })
					.eq("id", categoryId);
				if (error) throw error;
			});
		},
		[patchRestaurant],
	);

	const reorderCategory = useCallback(
		(restaurantId, menuId, fromCategoryId, toCategoryId) => {
			const restaurant = getRestaurantById(restaurantId);
			const menu = restaurant?.menus.find((item) => item.id === menuId);
			if (!menu) return;

			const nextCategories = reorderArray(
				menu.categories,
				fromCategoryId,
				toCategoryId,
			);

			patchRestaurant(restaurantId, (currentRestaurant) => ({
				...currentRestaurant,
				menus: currentRestaurant.menus.map((currentMenu) =>
					currentMenu.id === menuId
						? { ...currentMenu, categories: nextCategories }
						: currentMenu,
				),
			}));

			if (!supabase) return;

			persistMutation("Failed to persist category order", async () => {
				const updates = nextCategories.map((category, index) =>
					supabase
						.from("categories")
						.update({ orden: index })
						.eq("id", category.id),
				);
				const results = await Promise.all(updates);
				const firstError = results.find((result) => result.error)?.error;
				if (firstError) throw firstError;
			});
		},
		[patchRestaurant, getRestaurantById],
	);

	const removeCategory = useCallback(
		(restaurantId, menuId, categoryId) => {
			patchRestaurant(restaurantId, (restaurant) => ({
				...restaurant,
				menus: restaurant.menus.map((menu) =>
					menu.id === menuId
						? {
								...menu,
								categories: menu.categories.filter(
									(category) => category.id !== categoryId,
								),
							}
						: menu,
				),
			}));

			if (!supabase) return;

			persistMutation("Failed to delete category", async () => {
				const { error } = await supabase
					.from("categories")
					.delete()
					.eq("id", categoryId);
				if (error) throw error;
			});
		},
		[patchRestaurant],
	);

	return { addCategory, updateCategoryField, reorderCategory, removeCategory };
}
