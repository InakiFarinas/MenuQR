import { useState, useEffect, useCallback } from "react";
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

	const updateRestaurantField = useCallback(
		(restaurantId, field, value) => {
			patchRestaurant(restaurantId, (restaurant) => ({
				...restaurant,
				[field]: value,
			}));
		},
		[patchRestaurant],
	);

	// Menús
	const addMenu = useCallback(
		(restaurantId, setActiveMenuId) => {
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
		},
		[patchRestaurant],
	);

	const removeMenu = useCallback(
		(restaurantId, menuId) => {
			patchRestaurant(restaurantId, (restaurant) => ({
				...restaurant,
				menus: restaurant.menus.filter((menu) => menu.id !== menuId),
			}));
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
		},
		[patchRestaurant],
	);

	const reorderCategory = useCallback(
		(restaurantId, menuId, fromCategoryId, toCategoryId) => {
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
		},
		[patchRestaurant],
	);

	const addCategory = useCallback(
		(restaurantId, menuId, setActiveCategoryId) => {
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
		},
		[patchRestaurant],
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
		},
		[patchRestaurant],
	);

	// Platos (delegados a restaurantMutations para operaciones puras)
	const addDish = useCallback((restaurantId, menuId, categoryId) => {
		setRestaurants((prev) =>
			restaurantMutations.addDish(prev, restaurantId, menuId, categoryId),
		);
	}, []);

	const reorderDish = useCallback(
		(restaurantId, menuId, categoryId, fromDishId, toDishId) => {
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
		},
		[],
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
