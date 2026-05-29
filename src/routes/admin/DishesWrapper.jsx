import { useOutletContext, useParams } from "react-router-dom";
import AdminDishesList from "../../components/admin/AdminDishesList.jsx";

export default function DishesWrapper() {
	const { selectedRestaurant, admin, handleEditDish, handleBackFromDishes } =
		useOutletContext();
	const { menuSlug, categorySlug } = useParams();

	const activeMenu = selectedRestaurant?.menus?.find(
		(m) => m.slug === menuSlug,
	);

	const activeCategory = activeMenu?.categories?.find(
		(c) => c.slug === categorySlug,
	);

	if (!activeMenu || !activeCategory) return null;

	return (
		<AdminDishesList
			restaurant={selectedRestaurant}
			activeMenuId={activeMenu.id}
			activeCategoryId={activeCategory.id}
			onBack={handleBackFromDishes}
			onEditDish={handleEditDish}
			addDish={admin.addDish}
			updateDishField={admin.updateDishField}
			reorderDish={admin.reorderDish}
			removeDish={admin.removeDish}
		/>
	);
}
