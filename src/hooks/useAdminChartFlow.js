import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function useAdminChartFlow({
	selectedRestaurant,
	updateDishField,
	removeMenu,
	removeCategory,
	removeDish,
}) {
	const navigate = useNavigate();
	const { slug, menuSlug, categorySlug } = useParams();

	const [editingDish, setEditingDish] = useState(null);
	const [deleteConfirm, setDeleteConfirm] = useState(null);

	// Resolve slugs to IDs for mutations
	const activeMenu = selectedRestaurant?.menus?.find(
		(m) => m.slug === menuSlug,
	);
	const activeCategory = activeMenu?.categories?.find(
		(c) => c.slug === categorySlug,
	);
	const menuId = activeMenu?.id ?? null;
	const categoryId = activeCategory?.id ?? null;

	const handleSelectMenu = (selectedMenuSlug) => {
		navigate(`/admin/${slug}/chart/${selectedMenuSlug}`);
	};

	const handleSelectCategory = (selectedCategorySlug) => {
		navigate(`/admin/${slug}/chart/${menuSlug}/${selectedCategorySlug}`);
	};

	const handleBackFromCategories = () => {
		navigate(`/admin/${slug}/chart`);
	};

	const handleBackFromDishes = () => {
		navigate(`/admin/${slug}/chart/${menuSlug}`);
	};

	const handleEditDish = (dish) => {
		setEditingDish(dish);
	};

	const handleSaveDish = (formData) => {
		if (!editingDish || !menuId || !categoryId) return;

		[
			["name", formData.name],
			["description", formData.description],
			["price", formData.price],
			["available", formData.available],
			["image", formData.image],
		].forEach(([field, value]) => {
			updateDishField(
				selectedRestaurant.id,
				menuId,
				categoryId,
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

	const handleDeleteMenu = (menuIdToDelete) => {
		setDeleteConfirm({ action: "deleteMenu", menuId: menuIdToDelete });
	};

	const handleDeleteCategory = (categoryIdToDelete) => {
		setDeleteConfirm({
			action: "deleteCategory",
			categoryId: categoryIdToDelete,
		});
	};

	const confirmDelete = () => {
		if (!deleteConfirm) return;

		if (
			deleteConfirm.action === "deleteDish" &&
			editingDish &&
			menuId &&
			categoryId
		) {
			removeDish(selectedRestaurant.id, menuId, categoryId, editingDish.id);
			setEditingDish(null);
			navigate(`/admin/${slug}/chart/${menuSlug}`);
		} else if (deleteConfirm.action === "deleteMenu") {
			removeMenu(selectedRestaurant.id, deleteConfirm.menuId);
			navigate(`/admin/${slug}/chart`);
		} else if (deleteConfirm.action === "deleteCategory" && menuId) {
			removeCategory(selectedRestaurant.id, menuId, deleteConfirm.categoryId);
			navigate(`/admin/${slug}/chart/${menuSlug}`);
		}

		setDeleteConfirm(null);
	};

	return {
		menuSlug,
		categorySlug,
		menuId,
		categoryId,
		activeMenu,
		activeCategory,
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
