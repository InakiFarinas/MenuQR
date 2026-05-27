import { useState } from "react";
import {
	IconBuildingStore,
	IconCreditCard,
	IconFileText,
	IconPalette,
} from "@tabler/icons-react";
import SettingsHome from "./SettingsHome.jsx";
import LocalPage from "./pages/LocalPage.jsx";
import BrandPage from "./pages/BrandPage.jsx";
import BillingPage from "./pages/BillingPage.jsx";
import InvoicesPage from "./pages/InvoicesPage.jsx";

export default function AdminSettings({
	selectedRestaurant,
	updateRestaurantField,
}) {
	const [activePage, setActivePage] = useState(null);

	const settingsItems = [
		{
			id: "local",
			icon: IconBuildingStore,
			title: "Información del local",
			description: "Nombre, slug, ciudad y descripción",
		},
		{
			id: "brand",
			icon: IconPalette,
			title: "Color de marca",
			description: "Elige el color principal para tu menú",
		},
		{
			id: "billing",
			icon: IconCreditCard,
			title: "Plan y pago",
			description: "Suscripción y método de pago",
		},
		{
			id: "invoices",
			icon: IconFileText,
			title: "Historial de facturas",
			description: "Descarga y revisa tus pagos anteriores",
		},
	];

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

	if (activePage === "local") {
		return (
			<LocalPage
				selectedRestaurant={selectedRestaurant}
				updateRestaurantField={updateRestaurantField}
				onBack={() => setActivePage(null)}
			/>
		);
	}

	if (activePage === "brand") {
		return (
			<BrandPage
				selectedRestaurant={selectedRestaurant}
				updateRestaurantField={updateRestaurantField}
				brandColors={brandColors}
				colorMap={colorMap}
				onBack={() => setActivePage(null)}
			/>
		);
	}

	if (activePage === "billing") {
		return <BillingPage onBack={() => setActivePage(null)} />;
	}

	if (activePage === "invoices") {
		return <InvoicesPage onBack={() => setActivePage(null)} />;
	}

	return (
		<div className="space-y-8">
			<div className="overflow-hidden rounded-3xl border border-black/5 bg-white/85 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
				<div className="p-3 sm:p-4">
					<SettingsHome items={settingsItems} onSelectPage={setActivePage} />
				</div>
			</div>
		</div>
	);
}
