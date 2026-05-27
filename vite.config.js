import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	build: {
		// Use esbuild (default) to avoid requiring terser as an optional dependency
		// For production you can install terser (npm i -D terser) and switch back
		minify: "esbuild",
		esbuild: {
			drop: ["console", "debugger"],
		},
		// Split large vendor libraries into separate chunks
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules")) {
						if (id.includes("@tabler/icons-react")) return "vendor_tabler";
						if (id.includes("lucide-react")) return "vendor_lucide";
						if (id.includes("@supabase")) return "vendor_supabase";
						if (id.includes("radix-ui")) return "vendor_radix";
						if (id.includes("@headlessui")) return "vendor_headlessui";
						if (id.includes("react-router-dom")) return "vendor_routing";
						return "vendor";
					}
				},
			},
		},
		// Increase warning limit for chunk sizes (optional)
		chunkSizeWarningLimit: 2000,
	},
});
