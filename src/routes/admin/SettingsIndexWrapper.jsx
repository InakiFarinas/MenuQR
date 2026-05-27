import { useNavigate } from "react-router-dom";
import SettingsHome from "../../pages/admin/settings/SettingsHome.jsx";

export default function SettingsIndexWrapper() {
	const navigate = useNavigate();
	const settingsItems = [
		{ id: "local", title: "Información del local", description: "" },
		{ id: "brand", title: "Color de marca", description: "" },
		{ id: "billing", title: "Plan y pago", description: "" },
		{ id: "invoices", title: "Historial de facturas", description: "" },
	];
	return (
		<SettingsHome
			items={settingsItems}
			onSelectPage={(id) => navigate(`settings/${id}`)}
		/>
	);
}
