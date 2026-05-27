import { useNavigate } from "react-router-dom";
import BillingPage from "../../pages/admin/settings/BillingPage.jsx";
import useSelectedRestaurant from "../../hooks/useSelectedRestaurant.js";

export default function BillingWrapper() {
	const { selected, slug } = useSelectedRestaurant();
	const navigate = useNavigate();
	return (
		<BillingPage
			selectedRestaurant={selected}
			onBack={() => navigate(`/admin/${slug}/settings`)}
		/>
	);
}
