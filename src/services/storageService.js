import supabase from "../lib/supabaseClient.js";
import { error as logError } from "../lib/logger.js";

/**
 * Uploads an image file to Supabase Storage and returns the public URL.
 * @param {File} file - The image file to upload
 * @param {string} bucket - The storage bucket name (e.g. "avatars")
 * @param {string} path - The path within the bucket (e.g. "restaurant-123/avatar")
 * @returns {Promise<{ url: string | null, error: Error | null }>}
 */
export async function uploadImage(file, bucket, path) {
	if (!supabase) {
		return { url: null, error: new Error("Supabase no está configurado.") };
	}

	try {
		const { error: uploadError } = await supabase.storage
			.from(bucket)
			.upload(path, file, { upsert: true });

		if (uploadError) {
			logError("Storage upload error:", uploadError);
			return { url: null, error: uploadError };
		}

		const { data } = supabase.storage.from(bucket).getPublicUrl(path);

		return { url: data.publicUrl, error: null };
	} catch (err) {
		logError("Storage upload exception:", err);
		return { url: null, error: err };
	}
}
