import ChartPage from "../../pages/admin/ChartPage.jsx";
import useSelectedRestaurant from "../../hooks/useSelectedRestaurant.js";
import { useAdmin } from "../../contexts/AdminContext.jsx";

export default function ChartWrapper() {
	const { selected } = useSelectedRestaurant();
	const admin = useAdmin();
	return <ChartPage selectedRestaurant={selected} {...admin} />;
}
