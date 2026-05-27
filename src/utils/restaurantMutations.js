import { createId, reorderArray } from "./menu.js";

export function addDish(restaurants, restaurantId, menuId, categoryId) {
	return restaurants.map((restaurant) =>
		restaurant.id === restaurantId
			? {
					...restaurant,
					menus: restaurant.menus.map((menu) =>
						menu.id === menuId
							? {
									...menu,
									categories: menu.categories.map((category) =>
										category.id === categoryId
											? {
													...category,
													dishes: [
														...category.dishes,
														{
															id: createId("dish"),
															name: "Nuevo plato",
															description: "Edita esta descripción",
															price: 0,
															available: true,
															image:
																"https://images.unsplash.com/photo-1495582622526-3bec3d3fa735?w=400&h=400&fit=crop",
														},
													],
												}
											: category,
									),
								}
							: menu,
					),
				}
			: restaurant,
	);
}

export function reorderDish(
	restaurants,
	restaurantId,
	menuId,
	categoryId,
	fromDishId,
	toDishId,
) {
	return restaurants.map((restaurant) =>
		restaurant.id === restaurantId
			? {
					...restaurant,
					menus: restaurant.menus.map((menu) =>
						menu.id === menuId
							? {
									...menu,
									categories: menu.categories.map((category) =>
										category.id === categoryId
											? {
													...category,
													dishes: reorderArray(
														category.dishes,
														fromDishId,
														toDishId,
													),
												}
											: category,
									),
								}
							: menu,
					),
				}
			: restaurant,
	);
}

export function updateDishField(
	restaurants,
	restaurantId,
	menuId,
	categoryId,
	dishId,
	field,
	value,
) {
	return restaurants.map((restaurant) =>
		restaurant.id === restaurantId
			? {
					...restaurant,
					menus: restaurant.menus.map((menu) =>
						menu.id === menuId
							? {
									...menu,
									categories: menu.categories.map((category) =>
										category.id === categoryId
											? {
													...category,
													dishes: category.dishes.map((dish) =>
														dish.id === dishId
															? { ...dish, [field]: value }
															: dish,
													),
												}
											: category,
									),
								}
							: menu,
					),
				}
			: restaurant,
	);
}

export function removeDish(
	restaurants,
	restaurantId,
	menuId,
	categoryId,
	dishId,
) {
	return restaurants.map((restaurant) =>
		restaurant.id === restaurantId
			? {
					...restaurant,
					menus: restaurant.menus.map((menu) =>
						menu.id === menuId
							? {
									...menu,
									categories: menu.categories.map((category) =>
										category.id === categoryId
											? {
													...category,
													dishes: category.dishes.filter(
														(dish) => dish.id !== dishId,
													),
												}
											: category,
									),
								}
							: menu,
					),
				}
			: restaurant,
	);
}
