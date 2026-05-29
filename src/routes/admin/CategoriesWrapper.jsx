import { useOutletContext, useNavigate, useParams } from "react-router-dom";
import AdminCategoriesList from "../../components/admin/AdminCategoriesList.jsx";

export default function CategoriesWrapper() {
	const {
		selectedRestaurant,
		admin,
		handleSelectCategory,
		handleDeleteCategory,
	} = useOutletContext();
	const { slug, menuSlug } = useParams();
	const navigate = useNavigate();

	const activeMenu = selectedRestaurant?.menus?.find(
		(m) => m.slug === menuSlug,
	);

	if (!activeMenu) return null;

	return (
		<AdminCategoriesList
			restaurant={selectedRestaurant}
			activeMenuId={activeMenu.id}
			onSelectCategory={handleSelectCategory}
			onBack={() => navigate(`/admin/${slug}/chart`)}
			addCategory={admin.addCategory}
			removeCategory={handleDeleteCategory}
			updateCategoryField={admin.updateCategoryField}
			reorderCategory={admin.reorderCategory}
			updateMenuField={admin.updateMenuField}
		/>
	);
}
