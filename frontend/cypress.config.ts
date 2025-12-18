import { defineConfig } from "cypress";

export default defineConfig({
	component: {
		devServer: {
			framework: "react",
			bundler: "vite",
		},
		specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}",
	},
	e2e: {
		baseUrl: "http://localhost:5173",
		defaultCommandTimeout: 10000,
		pageLoadTimeout: 60000,
		requestTimeout: 10000,
		responseTimeout: 30000,
		setupNodeEvents(on, config) {
			require("@cypress/code-coverage/task")(on, config);
			return config;
		},
	},
	experimentalStudio: true,
});
