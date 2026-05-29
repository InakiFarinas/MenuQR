import supabase from "../lib/supabaseClient.js";
import { error as logError } from "../lib/logger.js";

/**
 * Registers a scan for a restaurant.
 * @param {string} restaurantId
 */
export async function registerScan(restaurantId) {
	if (!supabase) return;

	try {
		const { error } = await supabase
			.from("scans")
			.insert([{ restaurant_id: restaurantId }]);

		if (error) logError("Error registering scan:", error);
	} catch (err) {
		logError("Scan registration exception:", err);
	}
}

/**
 * Fetches scan counts for today, this week, and this month.
 * @param {string} restaurantId
 * @returns {Promise<{ today: number, week: number, month: number }>}
 */
export async function fetchScanMetrics(restaurantId) {
	if (!supabase) return { today: 0, week: 0, month: 0 };

	try {
		const now = new Date();

		const startOfDay = new Date(now);
		startOfDay.setHours(0, 0, 0, 0);

		const startOfWeek = new Date(now);
		startOfWeek.setDate(now.getDate() - now.getDay());
		startOfWeek.setHours(0, 0, 0, 0);

		const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

		const { data, error } = await supabase
			.from("scans")
			.select("created_at")
			.eq("restaurant_id", restaurantId)
			.gte("created_at", startOfMonth.toISOString());

		if (error) {
			logError("Error fetching scan metrics:", error);
			return { today: 0, week: 0, month: 0 };
		}

		const scans = data || [];

		const today = scans.filter(
			(s) => new Date(s.created_at) >= startOfDay,
		).length;

		const week = scans.filter(
			(s) => new Date(s.created_at) >= startOfWeek,
		).length;

		const month = scans.length;

		return { today, week, month };
	} catch (err) {
		logError("Scan metrics exception:", err);
		return { today: 0, week: 0, month: 0 };
	}
}
