import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@assets": path.resolve(__dirname, "src/assets"),
			"@globals": path.resolve(__dirname, "src/globals"),
			"@modules": path.resolve(__dirname, "src/modules"),
		},
	},
});
