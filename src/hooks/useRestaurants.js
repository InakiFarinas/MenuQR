import { useState, useEffect } from "react";
import {
	fetchRestaurants,
	fetchRestaurantsSummary,
	fetchRestaurantDetails,
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
		fetchRestaurantsSummary().then((data) => {
			if (!mounted) return;
			setRestaurants(data || []);
			setIsLoading(false);
		});

		return () => {
			mounted = false;
		};
	}, []);

	function patchRestaurant(restaurantId, updater) {
		setRestaurants((currentRestaurants) =>
			currentRestaurants.map((restaurant) =>
				restaurant.id === restaurantId ? updater(restaurant) : restaurant,
			),
		);
	}

	function updateRestaurantField(restaurantId, field, value) {
		patchRestaurant(restaurantId, (restaurant) => ({
			...restaurant,
			[field]: value,
		}));
	}

	// Menús
	function addMenu(restaurantId, setActiveMenuId) {
		const menuId = createId("menu");
		const menuName = "Nueva Carta";

		patchRestaurant(restaurantId, (restaurant) => ({
			...restaurant,
			menus: [
				...restaurant.menus,
				{
					id: menuId,
					name: menuName,
					slug: slugify(menuName),
					description: "Describe la carta aquí",
					isActive: false,
					categories: [],
				},
			],
		}));

		setActiveMenuId(menuId);
	}

	function updateMenuField(restaurantId, menuId, field, value) {
		patchRestaurant(restaurantId, (restaurant) => ({
			...restaurant,
			menus: restaurant.menus.map((menu) =>
				menu.id === menuId
					? {
							...menu,
							[field]: field === "name" ? value : value,
							...(field === "name" && { slug: slugify(value) }),
						}
					: menu,
			),
		}));
	}

	function removeMenu(restaurantId, menuId) {
		patchRestaurant(restaurantId, (restaurant) => ({
			...restaurant,
			menus: restaurant.menus.filter((menu) => menu.id !== menuId),
		}));
	}

	// Categorías
	function updateCategoryField(restaurantId, menuId, categoryId, field, value) {
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
	}

	function reorderCategory(restaurantId, menuId, fromCategoryId, toCategoryId) {
		patchRestaurant(restaurantId, (restaurant) => ({
			...restaurant,
			menus: restaurant.menus.map((menu) =>
				menu.id === menuId
					? {
							...menu,
							categories: reorderArray(
								menu.categories,
								fromCategoryId,
								toCategoryId,
							),
						}
					: menu,
			),
		}));
	}

	function addCategory(restaurantId, menuId, setActiveCategoryId) {
		const categoryId = createId("cat");

		patchRestaurant(restaurantId, (restaurant) => ({
			...restaurant,
			menus: restaurant.menus.map((menu) =>
				menu.id === menuId
					? {
							...menu,
							categories: [
								...menu.categories,
								{
									id: categoryId,
									name: "Nueva categoría",
									description: "Describe la sección aquí",
									dishes: [],
								},
							],
						}
					: menu,
			),
		}));

		setActiveCategoryId(categoryId);
	}

	function removeCategory(restaurantId, menuId, categoryId) {
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
	}

	// Platos (delegados a restaurantMutations para operaciones puras)
	function addDish(restaurantId, menuId, categoryId) {
		setRestaurants((prev) =>
			restaurantMutations.addDish(prev, restaurantId, menuId, categoryId),
		);
	}

	function reorderDish(restaurantId, menuId, categoryId, fromDishId, toDishId) {
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
	}

	function updateDishField(
		restaurantId,
		menuId,
		categoryId,
		dishId,
		field,
		value,
	) {
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
	}

	function removeDish(restaurantId, menuId, categoryId, dishId) {
		setRestaurants((prev) =>
			restaurantMutations.removeDish(
				prev,
				restaurantId,
				menuId,
				categoryId,
				dishId,
			),
		);
	}

	return {
		restaurants,
		isLoading,
		isPublished,
		setIsPublished,
		// Refresh summaries (fast) or pass { full: true } to refetch everything
		refresh: (options = {}) => {
			setIsLoading(true);
			if (options.full) {
				fetchRestaurants().then((data) => {
					setRestaurants(data || []);
					setIsLoading(false);
				});
			} else {
				fetchRestaurantsSummary().then((data) => {
					setRestaurants(data || []);
					setIsLoading(false);
				});
			}
		},

		// Load full menus/categories/dishes for a single restaurant on demand
		loadRestaurantDetails: async (restaurantId) => {
			const existing = restaurants.find((r) => r.id === restaurantId);
			if (!existing) return null;
			if (existing.menus && existing.menus.length > 0) return existing;
			const menus = await fetchRestaurantDetails(restaurantId);
			if (!menus) return null;
			patchRestaurant(restaurantId, (restaurant) => ({
				...restaurant,
				menus,
			}));
			return { ...existing, menus };
		},
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
}
