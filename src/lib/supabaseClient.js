import { createClient } from "@supabase/supabase-js";
import { error as logError } from "./logger.js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
	// Log early when environment variables are missing to ease debugging
	// during local development or misconfigured deployments.
	try {
		logError(
			"Supabase client not initialized: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing.",
		);
	} catch {
		// fallback to logger.warn if logError throws
		try {
			const { warn } = await import("./logger.js");
			warn(
				"Supabase client not initialized: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing.",
			);
		} catch {
			// last resort: console.warn
			// eslint-disable-next-line no-console
			console.warn(
				"Supabase client not initialized: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing.",
			);
		}
	}
}

export const supabase =
	SUPABASE_URL && SUPABASE_ANON_KEY
		? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
		: null;

export default supabase;
