import supabase from "../lib/supabaseClient.js";
import { slugify } from "../utils/menu.js";
import { error as logError } from "../lib/logger.js";
import { mapCategoryRow, mapDishRow } from "../utils/restaurantMappers.js";

function toRestaurantModel(
	restaurantRow,
	menusRows,
	categoriesRows,
	dishesRows,
) {
	const menus = menusRows
		.filter((menu) => menu.restaurante_id === restaurantRow.id)
		.map((menuRow, menuIndex) => {
			const categories = categoriesRows
				.filter((category) => category.menu_id === menuRow.id)
				.sort((left, right) => (left.orden ?? 0) - (right.orden ?? 0))
				.map((categoryRow) => {
					const dishes = dishesRows
						.filter((dish) => dish.categoria_id === categoryRow.id)
						.sort((left, right) => (left.orden ?? 0) - (right.orden ?? 0))
						.map(mapDishRow);

					return { ...mapCategoryRow(categoryRow), dishes };
				});

			return {
				id: menuRow.id,
				name: menuRow.nombre,
				slug: slugify(menuRow.nombre),
				description: menuRow.descripcion ?? "",
				isActive: menuIndex === 0,
				categories,
			};
		});

	return {
		id: restaurantRow.id,
		name: restaurantRow.nombre,
		slug: restaurantRow.slug,
		ownerId: restaurantRow.owner_id,
		planId: restaurantRow.plan_id,
		avatarImage: restaurantRow.logo_url ?? "",
		avatarBackgroundImage: restaurantRow.cover_url ?? "",
		accent: restaurantRow.accent ?? "orange",
		menus,
	};
}

async function fetchFromSupabase() {
	if (!supabase) {
		logError(
			"Supabase client is not initialized. Check environment variables.",
		);
		return null;
	}

	try {
		const { data: restaurants, error: restaurantsError } = await supabase
			.from("restaurants")
			.select("*");
		const { data: menus, error: menusError } = await supabase
			.from("menus")
			.select("*");
		const { data: categories, error: categoriesError } = await supabase
			.from("categories")
			.select("*");
		const { data: dishes, error: dishesError } = await supabase
			.from("dishes")
			.select("*");

		const anyError =
			restaurantsError || menusError || categoriesError || dishesError;
		if (anyError) {
			logError("Supabase query error:", anyError);
			return null;
		}

		if (!restaurants) return null;

		return restaurants.map((restaurantRow) =>
			toRestaurantModel(
				restaurantRow,
				menus || [],
				categories || [],
				dishes || [],
			),
		);
	} catch (err) {
		logError("Supabase fetch error:", err);
		return null;
	}
}

export async function fetchRestaurants() {
	const remote = await fetchFromSupabase();
	return remote && Array.isArray(remote) && remote.length > 0 ? remote : [];
}

export default { fetchRestaurants };

export async function fetchRestaurantsSummary() {
	if (!supabase) return [];
	try {
		const { data: restaurants, error } = await supabase
			.from("restaurants")
			.select(
				"id, nombre, slug, logo_url, cover_url, owner_id, plan_id, accent",
			);

		if (error) {
			logError("Supabase summary query error:", error);
			return [];
		}

		return (restaurants || []).map((r) => ({
			id: r.id,
			name: r.nombre,
			slug: r.slug,
			ownerId: r.owner_id,
			planId: r.plan_id,
			accent: r.accent ?? "orange",
			avatarImage: r.logo_url ?? "",
			avatarBackgroundImage: r.cover_url ?? "",
			menus: [],
		}));
	} catch (err) {
		logError("Supabase summary fetch error:", err);
		return [];
	}
}

export async function fetchRestaurantDetails(restaurantId) {
	if (!supabase) return null;
	try {
		const { data: menus, error: menusError } = await supabase
			.from("menus")
			.select("*")
			.eq("restaurante_id", restaurantId);

		if (menusError) {
			logError("Supabase menus query error:", menusError);
			return null;
		}

		const menuIds = (menus || []).map((m) => m.id);

		const { data: categories, error: categoriesError } = await supabase
			.from("categories")
			.select("*")
			.in("menu_id", menuIds);

		if (categoriesError) {
			logError("Supabase categories query error:", categoriesError);
			return null;
		}

		const categoryIds = (categories || []).map((c) => c.id);

		const { data: dishes, error: dishesError } = await supabase
			.from("dishes")
			.select("*")
			.in("categoria_id", categoryIds);

		if (dishesError) {
			logError("Supabase dishes query error:", dishesError);
			return null;
		}

		return (menus || []).map((menuRow, menuIndex) => {
			const categoriesForMenu = (categories || [])
				.filter((c) => c.menu_id === menuRow.id)
				.sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0))
				.map((categoryRow) => {
					const dishesForCategory = (dishes || [])
						.filter((d) => d.categoria_id === categoryRow.id)
						.sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0))
						.map(mapDishRow);

					return { ...mapCategoryRow(categoryRow), dishes: dishesForCategory };
				});

			return {
				id: menuRow.id,
				name: menuRow.nombre,
				slug: slugify(menuRow.nombre),
				description: menuRow.descripcion ?? "",
				isActive: menuIndex === 0,
				categories: categoriesForMenu,
			};
		});
	} catch (err) {
		logError("Supabase restaurant details fetch error:", err);
		return null;
	}
}
