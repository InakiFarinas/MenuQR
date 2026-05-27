import supabase from "../lib/supabaseClient.js";
import { triggerAlert } from "../lib/alertBus.js";
import { error as logError } from "../lib/logger.js";

export async function fetchPlans() {
	if (!supabase) {
		triggerAlert({
			type: "error",
			message: "Error de configuración: servicio de planes no disponible",
		});
		return [];
	}

	try {
		const { data, error } = await supabase
			.from("planes")
			.select("id, nombre, max_menues, precio_mensual, activo, created_at")
			.order("precio_mensual", { ascending: true });

		if (error) {
			logError("Supabase plans error:", error);
			triggerAlert({
				type: "error",
				message: "No se pudo obtener los planes. Intente nuevamente.",
			});
			return [];
		}

		return data ?? [];
	} catch (error) {
		logError("Supabase plans error:", error);
		triggerAlert({
			type: "error",
			message: "Error al cargar planes. Revisa la consola.",
		});
		return [];
	}
}

export default { fetchPlans };
