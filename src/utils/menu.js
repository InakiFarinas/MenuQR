export function formatCurrency(value) {
	return new Intl.NumberFormat("es-ES", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 1,
	}).format(value);
}

export function createId(prefix) {
	return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

export function slugify(text) {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "") // Eliminar caracteres especiales
		.replace(/\s+/g, "-") // Espacios a guiones
		.replace(/-+/g, "-"); // Múltiples guiones a uno
}

export function reorderArray(items, fromId, toId) {
	const fromIndex = items.findIndex((item) => item.id === fromId);
	const toIndex = items.findIndex((item) => item.id === toId);

	if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) {
		return items;
	}

	const nextItems = [...items];
	const [movedItem] = nextItems.splice(fromIndex, 1);
	nextItems.splice(toIndex, 0, movedItem);

	return nextItems;
}
