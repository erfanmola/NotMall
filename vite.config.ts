import MillionLint from "@million/lint";
import { defineConfig, type UserConfig } from "vite";
import pluginPurgeCss from "vite-plugin-purgecss";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig((config) => {
	const isProduction = config.mode !== "development";

	return {
		plugins: [
			!isProduction
				? MillionLint.vite({
						enabled: true,
					})
				: "",
			react(),
			tailwindcss(),
			isProduction
				? pluginPurgeCss({
						variables: true,
						keyframes: true,
						content: ["./src/**/*.tsx"],
						safelist: {
							standard: [
								":root",
								"body",
								"html",
								"#root",
								"a",
								"button",
								"div",
								"span",
								"ul",
								"ol",
								"svg",
							],
							greedy: [
								/container-/,
								/shimmer/,
								/html/,
								/body/,
								/swiper/,
								/react-modal-sheet/,
							],
						},
						defaultExtractor: (content) =>
							content.match(/[\w-/:]+(?<!:)/g) || [],
					})
				: "",
		],
	} as UserConfig;
});
