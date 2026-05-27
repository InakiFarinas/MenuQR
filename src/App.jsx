import { useState } from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { cloneRestaurants, initialRestaurants } from "./data/restaurants.js";
import AdminPage from "./pages/AdminPage.jsx";
import PublicMenuPage from "./pages/PublicMenuPage.jsx";
import { createId, reorderArray, slugify } from "./utils/menu.js";

export default function App() {
	const [restaurants, setRestaurants] = useState(() =>
		cloneRestaurants(initialRestaurants),
	);
	const [isPublished, setIsPublished] = useState(true);

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
							// Actualizar slug si cambió el nombre
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

	// Categorías (dentro de menús)
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

	// Platos
	function addDish(restaurantId, menuId, categoryId) {
		patchRestaurant(restaurantId, (restaurant) => ({
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
													tag: "Nuevo",
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
		}));
	}

	function reorderDish(restaurantId, menuId, categoryId, fromDishId, toDishId) {
		patchRestaurant(restaurantId, (restaurant) => ({
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
		}));
	}

	function updateDishField(
		restaurantId,
		menuId,
		categoryId,
		dishId,
		field,
		value,
	) {
		patchRestaurant(restaurantId, (restaurant) => ({
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
												dish.id === dishId ? { ...dish, [field]: value } : dish,
											),
										}
									: category,
							),
						}
					: menu,
			),
		}));
	}

	function removeDish(restaurantId, menuId, categoryId, dishId) {
		patchRestaurant(restaurantId, (restaurant) => ({
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
		}));
	}

	return (
		<Routes>
			<Route
				path="/"
				element={<Navigate to={`/${restaurants[0]?.slug ?? ""}`} replace />}
			/>
			<Route
				path="/:restaurantSlug"
				element={<PublicRoutePage restaurants={restaurants} />}
			/>
			<Route
				path="/:restaurantSlug/:menuSlug"
				element={<PublicRoutePage restaurants={restaurants} />}
			/>
			<Route
				path="/admin"
				element={
					<Navigate to={`/admin/${restaurants[0]?.slug ?? ""}`} replace />
				}
			/>
			<Route
				path="/admin/:slug"
				element={
					<AdminRoutePage
						restaurants={restaurants}
						updateRestaurantField={updateRestaurantField}
						addMenu={addMenu}
						updateMenuField={updateMenuField}
						removeMenu={removeMenu}
						updateCategoryField={updateCategoryField}
						addCategory={addCategory}
						removeCategory={removeCategory}
						reorderCategory={reorderCategory}
						addDish={addDish}
						updateDishField={updateDishField}
						removeDish={removeDish}
						reorderDish={reorderDish}
						isPublished={isPublished}
						setIsPublished={setIsPublished}
					/>
				}
			/>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
}

function PublicRoutePage(props) {
	const { restaurantSlug, menuSlug } = useParams();
	const selectedRestaurant =
		props.restaurants.find(
			(restaurant) => restaurant.slug === restaurantSlug,
		) ?? null;

	if (!selectedRestaurant) {
		const fallbackSlug = props.restaurants[0]?.slug ?? "";

		return <Navigate to={`/${fallbackSlug}`} replace />;
	}

	if (restaurantSlug !== selectedRestaurant.slug) {
		return <Navigate to={`/${selectedRestaurant.slug}`} replace />;
	}

	return (
		<PublicMenuPage
			key={`${selectedRestaurant.slug}-${menuSlug}`}
			selectedRestaurant={selectedRestaurant}
			selectedMenuSlug={menuSlug}
			{...props}
		/>
	);
}

function AdminRoutePage(props) {
	const { slug } = useParams();
	const selectedRestaurant =
		props.restaurants.find((restaurant) => restaurant.slug === slug) ?? null;

	if (!selectedRestaurant) {
		const fallbackSlug = props.restaurants[0]?.slug ?? "";

		return <Navigate to={`/admin/${fallbackSlug}`} replace />;
	}

	if (slug !== selectedRestaurant.slug) {
		return <Navigate to={`/admin/${selectedRestaurant.slug}`} replace />;
	}

	return (
		<AdminPage
			key={selectedRestaurant.slug}
			selectedSlug={selectedRestaurant.slug}
			{...props}
		/>
	);
}
