import { slugify } from "./menu.js";
import { error as logError } from "../lib/logger.js";

export function mapMenuRow(menuRow) {
	return {
		id: menuRow.id,
		name: menuRow.nombre,
		slug: slugify(menuRow.nombre),
		description: menuRow.descripcion ?? "",
		isActive: false,
		categories: [],
	};
}

export function mapCategoryRow(categoryRow) {
	return {
		id: categoryRow.id,
		name: categoryRow.nombre,
		slug: categoryRow.slug ?? slugify(categoryRow.nombre),
		description: categoryRow.descripcion ?? "",
		available: categoryRow.activa !== false,
		dishes: [],
	};
}

export function mapDishRow(dishRow) {
	return {
		id: dishRow.id,
		name: dishRow.nombre,
		slug: dishRow.slug ?? slugify(dishRow.nombre),
		description: dishRow.descripcion ?? "",
		price: Number(dishRow.precio ?? 0),
		available: dishRow.disponible !== false,
		image: dishRow.imagen_url ?? "",
	};
}

export function persistMutation(label, operation) {
	void operation().catch((error) => {
		logError(label, error);
	});
}
