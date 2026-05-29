import { useNavigate } from "react-router-dom";
import {
	IconBuildingStore,
	IconCreditCard,
	IconFileText,
	IconPalette,
} from "@tabler/icons-react";
import SettingsHome from "../../pages/admin/settings/SettingsHome.jsx";

export default function SettingsIndexWrapper() {
	const navigate = useNavigate();
	const settingsItems = [
		{
			id: "local",
			title: "Información del local",
			description: "",
			icon: IconBuildingStore,
		},
		{
			id: "brand",
			title: "Color de marca",
			description: "",
			icon: IconPalette,
		},
		{
			id: "billing",
			title: "Plan y pago",
			description: "",
			icon: IconCreditCard,
		},
		{
			id: "invoices",
			title: "Historial de facturas",
			description: "",
			icon: IconFileText,
		},
	];
	return (
		<SettingsHome items={settingsItems} onSelectPage={(id) => navigate(id)} />
	);
}
