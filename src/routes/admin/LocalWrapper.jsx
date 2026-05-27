import { useNavigate } from "react-router-dom";
import LocalPage from "../../pages/admin/settings/LocalPage.jsx";
import useSelectedRestaurant from "../../hooks/useSelectedRestaurant.js";
import { useAdmin } from "../../contexts/AdminContext.jsx";

export default function LocalWrapper() {
	const { selected, slug } = useSelectedRestaurant();
	const { updateRestaurantField } = useAdmin();
	const navigate = useNavigate();
	return (
		<LocalPage
			selectedRestaurant={selected}
			updateRestaurantField={updateRestaurantField}
			onBack={() => navigate(`/admin/${slug}/settings`)}
		/>
	);
}
