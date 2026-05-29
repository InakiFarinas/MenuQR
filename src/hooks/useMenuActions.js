import { useCallback } from "react";
import supabase from "../lib/supabaseClient.js";
import { createId, slugify } from "../utils/menu.js";
import { mapMenuRow, persistMutation } from "../utils/restaurantMappers.js";

export default function useMenuActions({ patchRestaurant }) {
	const addMenu = useCallback(
		(restaurantId, setActiveMenuId, { name, description } = {}) => {
			const menuName = name?.trim() || "Nueva Carta";
			const menuDescription = description?.trim() || "Describe la carta aquí";

			if (!supabase) {
				const menuId = createId("menu");
				patchRestaurant(restaurantId, (currentRestaurant) => ({
					...currentRestaurant,
					menus: [
						...currentRestaurant.menus,
						{
							id: menuId,
							name: menuName,
							slug: slugify(menuName),
							description: menuDescription,
							isActive: false,
							categories: [],
						},
					],
				}));
				setActiveMenuId(menuId);
				return;
			}

			persistMutation("Failed to create menu", async () => {
				const { data, error } = await supabase
					.from("menus")
					.insert([
						{
							restaurante_id: restaurantId,
							nombre: menuName,
							descripcion: menuDescription,
						},
					])
					.select("*")
					.single();

				if (error) throw error;
				if (!data) return;

				patchRestaurant(restaurantId, (currentRestaurant) => ({
					...currentRestaurant,
					menus: [...currentRestaurant.menus, mapMenuRow(data)],
				}));
				setActiveMenuId(data.id);
			});
		},
		[patchRestaurant],
	);

	const updateMenuField = useCallback(
		(restaurantId, menuId, field, value) => {
			patchRestaurant(restaurantId, (restaurant) => ({
				...restaurant,
				menus: restaurant.menus.map((menu) =>
					menu.id === menuId
						? {
								...menu,
								[field]: value,
								...(field === "name" && { slug: slugify(value) }),
							}
						: menu,
				),
			}));

			if (!supabase) return;

			const columnMap = { name: "nombre", description: "descripcion" };
			const column = columnMap[field];
			if (!column) return;

			persistMutation("Failed to persist menu field", async () => {
				const { error } = await supabase
					.from("menus")
					.update({ [column]: value })
					.eq("id", menuId);
				if (error) throw error;
			});
		},
		[patchRestaurant],
	);

	const removeMenu = useCallback(
		(restaurantId, menuId) => {
			patchRestaurant(restaurantId, (restaurant) => ({
				...restaurant,
				menus: restaurant.menus.filter((menu) => menu.id !== menuId),
			}));

			if (!supabase) return;

			persistMutation("Failed to delete menu", async () => {
				const { error } = await supabase
					.from("menus")
					.delete()
					.eq("id", menuId);
				if (error) throw error;
			});
		},
		[patchRestaurant],
	);

	return { addMenu, updateMenuField, removeMenu };
}
