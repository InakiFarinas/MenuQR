import { useState } from "react";

export default function useAdminChartFlow({
	selectedRestaurant,
	activeMenuId,
	setActiveMenuId,
	updateDishField,
	removeMenu,
	removeCategory,
	removeDish,
}) {
	const [screen, setScreen] = useState("menus");
	const [activeCategoryId, setActiveCategoryId] = useState(null);
	const [editingDish, setEditingDish] = useState(null);
	const [deleteConfirm, setDeleteConfirm] = useState(null);

	const handleSelectMenu = (menuId) => {
		setActiveMenuId(menuId);
		setScreen("categories");
		setActiveCategoryId(null);
	};

	const handleSelectCategory = (categoryId) => {
		setActiveCategoryId(categoryId);
		setScreen("dishes");
	};

	const handleBackFromCategories = () => {
		setScreen("menus");
		setActiveCategoryId(null);
	};

	const handleBackFromDishes = () => {
		setScreen("categories");
	};

	const handleEditDish = (dish) => {
		setEditingDish(dish);
	};

	const handleSaveDish = (formData) => {
		if (!editingDish) return;

		[
			["name", formData.name],
			["description", formData.description],
			["price", formData.price],
			["available", formData.available],
			["image", formData.image],
		].forEach(([field, value]) => {
			updateDishField(
				selectedRestaurant.id,
				activeMenuId,
				activeCategoryId,
				editingDish.id,
				field,
				value,
			);
		});

		setEditingDish(null);
	};

	const handleDeleteDish = () => {
		setDeleteConfirm({ action: "deleteDish" });
	};

	const handleDeleteMenu = (menuId) => {
		setDeleteConfirm({ action: "deleteMenu", menuId });
	};

	const handleDeleteCategory = (categoryId) => {
		setDeleteConfirm({ action: "deleteCategory", categoryId });
	};

	const confirmDelete = () => {
		if (!deleteConfirm) return;

		if (deleteConfirm.action === "deleteDish" && editingDish) {
			removeDish(
				selectedRestaurant.id,
				activeMenuId,
				activeCategoryId,
				editingDish.id,
			);
			setEditingDish(null);
		} else if (deleteConfirm.action === "deleteMenu") {
			removeMenu(selectedRestaurant.id, deleteConfirm.menuId);
		} else if (deleteConfirm.action === "deleteCategory") {
			removeCategory(
				selectedRestaurant.id,
				activeMenuId,
				deleteConfirm.categoryId,
			);
		}

		setDeleteConfirm(null);
	};

	return {
		screen,
		activeCategoryId,
		editingDish,
		deleteConfirm,
		handleSelectMenu,
		handleSelectCategory,
		handleBackFromCategories,
		handleBackFromDishes,
		handleEditDish,
		handleSaveDish,
		handleDeleteDish,
		handleDeleteMenu,
		handleDeleteCategory,
		confirmDelete,
		clearEditingDish: () => setEditingDish(null),
		clearDeleteConfirm: () => setDeleteConfirm(null),
	};
}
