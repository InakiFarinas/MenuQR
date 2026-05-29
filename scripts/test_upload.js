import "dotenv/config";
import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
	console.error("Missing env vars");
	process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function run() {
	try {
		const filePath = path.join(process.cwd(), "scripts", "test-avatar.txt");
		fs.writeFileSync(filePath, "hello world");
		const file = fs.createReadStream(filePath);
		const uploadPath = `restaurants/test/avatar-${Date.now()}.txt`;
		const { data, error } = await supabase.storage
			.from("avatars")
			.upload(uploadPath, file, { upsert: true });
		console.log("upload data:", data);
		console.log("upload error:", error);
		if (!error) {
			const { data: publicData } = supabase.storage
				.from("avatars")
				.getPublicUrl(uploadPath);
			console.log("public url:", publicData);
		}
	} catch (err) {
		console.error("unexpected error", err);
	}
}

run();
