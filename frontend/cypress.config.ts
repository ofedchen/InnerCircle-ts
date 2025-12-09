import { defineConfig } from "cypress";

export default defineConfig({
	component: {
		devServer: {
			framework: "react",
			bundler: "vite",
		},
		specPattern: "src/**/*. cy.{js,jsx,ts,tsx}",
	},
	e2e: {
		baseUrl: "http://localhost:3000",
	},
});
