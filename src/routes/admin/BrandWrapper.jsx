import { useNavigate } from "react-router-dom";
import BrandPage from "../../pages/admin/settings/BrandPage.jsx";
import useSelectedRestaurant from "../../hooks/useSelectedRestaurant.js";
import { useAdmin } from "../../contexts/useAdmin.js";

export default function BrandWrapper() {
	const { selected, slug } = useSelectedRestaurant();
	const { updateRestaurantField } = useAdmin();
	const navigate = useNavigate();
	const brandColors = [
		{ name: "Azul", value: "blue" },
		{ name: "Rojo", value: "red" },
		{ name: "Verde", value: "green" },
		{ name: "Púrpura", value: "purple" },
		{ name: "Ámbar", value: "amber" },
		{ name: "Cyan", value: "cyan" },
		{ name: "Indigo", value: "indigo" },
		{ name: "Rosa", value: "pink" },
	];
	const colorMap = {
		blue: "bg-blue-500",
		red: "bg-red-500",
		green: "bg-green-500",
		purple: "bg-purple-500",
		amber: "bg-amber-500",
		cyan: "bg-cyan-500",
		indigo: "bg-indigo-500",
		pink: "bg-pink-500",
	};
	return (
		<BrandPage
			selectedRestaurant={selected}
			updateRestaurantField={updateRestaurantField}
			brandColors={brandColors}
			colorMap={colorMap}
			onBack={() => navigate(`/admin/${slug}/settings`)}
		/>
	);
}
