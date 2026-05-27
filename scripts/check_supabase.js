import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
	console.error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY");
	process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function run() {
	try {
		const restaurantRes = await supabase
			.from("restaurants")
			.select("*")
			.limit(1);
		console.log("restaurants status", restaurantRes.status);
		console.log("restaurants error", restaurantRes.error);
		console.log("restaurants data count", (restaurantRes.data || []).length);

		const menusRes = await supabase
			.from("menus")
			.select("*")
			.eq("restaurante_id", "a1000000-0000-0000-0000-000000000001");
		console.log("menus status", menusRes.status);
		console.log("menus error", menusRes.error);
		console.log("menus count", (menusRes.data || []).length);

		const categoriesRes = await supabase
			.from("categories")
			.select("*")
			.in("menu_id", ["b1000000-0000-0000-0000-000000000001"]);
		console.log("categories status", categoriesRes.status);
		console.log("categories error", categoriesRes.error);
		console.log("categories count", (categoriesRes.data || []).length);
	} catch (err) {
		console.error("Unexpected error", err);
	}
}

run();
