import StatusScreen from "./StatusScreen.jsx";

export default function NoRestaurants() {
	return (
		<StatusScreen
			badge="QR"
			title="No hay restaurantes configurados."
			description="Revisa Supabase o vuelve a sembrar datos para que la app muestre el contenido."
			maxWidth="max-w-md"
		/>
	);
}
