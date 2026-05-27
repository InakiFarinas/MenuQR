import { useNavigate } from "react-router-dom";
import InvoicesPage from "../../pages/admin/settings/InvoicesPage.jsx";
import useSelectedRestaurant from "../../hooks/useSelectedRestaurant.js";

export default function InvoicesWrapper() {
	const { slug } = useSelectedRestaurant();
	const navigate = useNavigate();
	return <InvoicesPage onBack={() => navigate(`/admin/${slug}/settings`)} />;
}
