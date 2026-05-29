import { useState, useEffect, useCallback } from "react";
import supabase from "../lib/supabaseClient.js";
import { error as logError } from "../lib/logger.js";
import {
	fetchRestaurants,
	fetchRestaurantsSummary,
} from "../services/restaurantsService.js";
import { createId, reorderArray, slugify } from "../utils/menu.js";
import * as restaurantMutations from "../utils/restaurantMutations.js";

export default function useRestaurants() {
	const [restaurants, setRestaurants] = useState(() => []);
	const [isLoading, setIsLoading] = useState(true);
	const [isPublished, setIsPublished] = useState(true);

	useEffect(() => {
		let mounted = true;
		// Load lightweight summaries first to improve LCP
		fetchRestaurantsSummary()
			.then((data) => {
				if (!mounted) return;
				setRestaurants(data || []);
			})
			.catch(() => {
				if (!mounted) return;
				setRestaurants([]);
			})
			.finally(() => {
				if (!mounted) return;
				setIsLoading(false);
			});

		return () => {
			mounted = false;
		};
	}, []);

	const patchRestaurant = useCallback((restaurantId, updater) => {
		setRestaurants((currentRestaurants) =>
			currentRestaurants.map((restaurant) =>
				restaurant.id === restaurantId ? updater(restaurant) : restaurant,
			),
		);
	}, []);

	const getRestaurantById = useCallback(
		(restaurantId) =>
			restaurants.find((restaurant) => restaurant.id === restaurantId),
		[restaurants],
	);

	function mapMenuRow(menuRow) {
		return {
			id: menuRow.id,
			name: menuRow.nombre,
			slug: slugify(menuRow.nombre),
			description: menuRow.descripcion ?? "",
			isActive: false,
			categories: [],
		};
	}

	function mapCategoryRow(categoryRow) {
		return {
			id: categoryRow.id,
			name: categoryRow.nombre,
			description: categoryRow.descripcion ?? "",
			available: categoryRow.activa !== false,
			dishes: [],
		};
	}

	function mapDishRow(dishRow) {
		return {
			id: dishRow.id,
			name: dishRow.nombre,
			description: dishRow.descripcion ?? "",
			price: Number(dishRow.precio ?? 0),
			available: dishRow.disponible !== false,
			image: dishRow.imagen_url ?? "",
		};
	}

	function persistMutation(label, operation) {
		void operation().catch((error) => {
			logError(label, error);
		});
	}

	const updateRestaurantField = useCallback(
		(restaurantId, field, value) => {
			patchRestaurant(restaurantId, (restaurant) => ({
				...restaurant,
				[field]: value,
			}));

			if (field === "menus") return;

			const columnMap = {
				name: "nombre",
				description: "descripcion",
				city: "ciudad",
				accent: "accent",
				avatarImage: "logo_url",
				avatarBackgroundImage: "cover_url",
			};

			const column = columnMap[field];
			if (!column || !supabase) return;

			persistMutation("Failed to persist restaurant field", async () => {
				const { error } = await supabase
					.from("restaurants")
					.update({ [column]: value })
					.eq("id", restaurantId);
				if (error) throw error;
			});
		},
		[patchRestaurant],
	);

	// Menús
	const addMenu = useCallback(
		(restaurantId, setActiveMenuId) => {
			const menuName = "Nueva Carta";
			const menuDescription = "Describe la carta aquí";

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

			const columnMap = {
				name: "nombre",
				description: "descripcion",
			};
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

	// Categorías
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
						? {
								...currentMenu,
								categories: nextCategories,
							}
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

	// Platos (delegados a restaurantMutations para operaciones puras)
	const addDish = useCallback(
		(restaurantId, menuId, categoryId) => {
			const restaurant = getRestaurantById(restaurantId);
			const menu = restaurant?.menus.find((item) => item.id === menuId);
			const category = menu?.categories.find((item) => item.id === categoryId);

			if (!supabase) {
				setRestaurants((prev) =>
					restaurantMutations.addDish(prev, restaurantId, menuId, categoryId),
				);
				return;
			}

			persistMutation("Failed to create dish", async () => {
				const { data, error } = await supabase
					.from("dishes")
					.insert([
						{
							categoria_id: categoryId,
							nombre: "Nuevo plato",
							descripcion: "Edita esta descripción",
							precio: 0,
							disponible: true,
							imagen_url:
								"https://images.unsplash.com/photo-1495582622526-3bec3d3fa735?w=400&h=400&fit=crop",
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
		[patchRestaurant, getRestaurantById],
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
		[],
	);

	const removeDish = useCallback((restaurantId, menuId, categoryId, dishId) => {
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
			const { error } = await supabase.from("dishes").delete().eq("id", dishId);
			if (error) throw error;
		});
	}, []);

	const refresh = useCallback((options = {}) => {
		setIsLoading(true);
		if (options.full) {
			fetchRestaurants()
				.then((data) => {
					setRestaurants(data || []);
				})
				.catch(() => {
					setRestaurants([]);
				})
				.finally(() => {
					setIsLoading(false);
				});
		} else {
			fetchRestaurantsSummary()
				.then((data) => {
					setRestaurants(data || []);
				})
				.catch(() => {
					setRestaurants([]);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, []);

	const adminActions = {
		patchRestaurant,
		updateRestaurantField,
		addMenu,
		updateMenuField,
		removeMenu,
		updateCategoryField,
		reorderCategory,
		addCategory,
		removeCategory,
		addDish,
		reorderDish,
		updateDishField,
		removeDish,
	};

	return {
		restaurants,
		isLoading,
		isPublished,
		setIsPublished,
		refresh,
		...adminActions,
	};
}
