describe("Browsing the sites different routes", () => {
	it("browses the site without logging in to a user", function () {
		cy.visit("/");

		cy.get('[data-cy="home-container"] a').click();
		cy.get('#root a[href="/categories/Snow"] h2.absolute').click();
		cy.get('img[alt="Candide Thovex"]').click();
		cy.get("#root img.w-12").click();
		cy.get('[data-cy="home-container"] a').click();
		cy.get('#root a[href="/categories/Kayak"] h2.absolute').click();
		cy.get('img[alt="Aniol Serrasolses"]').click();
		cy.get('[data-testid="MenuOutlinedIcon"] path').click();
		cy.get('[data-cy="side-menu"] a[href="/categories"]').click();
		cy.get('#root a[href="/categories/Bike"] h2.absolute').click();
		cy.get('img[alt="Loïc Bruni"]').click();
		cy.get(
			'[data-cy="menu-icon"] button.css-146st0g-JoyIconButton-root'
		).click();
		cy.get('[data-cy="side-menu"] a[href="/feed"]').click();
		cy.get("#root button.css-5wpb4w-JoyButton-root").click();
		cy.get('#root a[href="/categories/Skate"] h2.absolute').click();
		cy.get("#root img.w-12").click();
		cy.get('[data-cy="home-container"] a').click();
		cy.get('#root a[href="/categories/Climb"] h2.absolute').click();
		cy.get('img[alt="Alex Honnold"]').click();
		cy.get('[data-testid="MenuOutlinedIcon"]').click();
		cy.get('[data-cy="side-menu"] a[href="/categories"]').click();
		cy.get('#root a[href="/categories/Fly"] h2.absolute').click();
		cy.get('img[alt="Jeb Corliss"]').click();
		cy.get('#root a[href="/privacy"]').click();
		cy.get('#root a[href="/terms"]').click();
		cy.get(
			'[data-cy="menu-icon"] button.css-146st0g-JoyIconButton-root'
		).click();
		cy.get('[data-cy="side-menu"] a[href="/faq"]').click();
		cy.get('[data-testid="MenuOutlinedIcon"]').click();
		cy.get('[data-cy="side-menu"] a[href="/about"]').click();
		cy.get('#root a[href="/categories"]').click();
		cy.get('#root a[href="/categories/Surf"] h2.absolute').click();
		cy.get('img[alt="Maya Gabeira"]').click();
		cy.get('[data-testid="MenuOutlinedIcon"] path').click();
		cy.get('[data-cy="side-menu"] a[href="/categories"]').click();
		cy.get('#root a[href="/categories/Bike"] h2.absolute').click();
		cy.get('img[alt="Rachel Atherton"]').click();
		cy.get(
			'section:nth-child(2) > [data-cy="auth-modal-buttons"] > button.css-5wpb4w-JoyButton-root'
		).click();
		cy.get(
			'div.css-1idhl6t-JoyDrawer-content [data-cy="switch-to-login"]'
		).click();
		cy.get("body").type("{esc}");

		cy.get(
			'[data-cy="join-the-circle"] button.css-5wpb4w-JoyButton-root'
		).click();

		cy.get("body").type("{esc}");

		cy.get(
			'[data-cy="auth-modal-buttons"] button.css-bgryco-JoyButton-root'
		).click();

		cy.get("body").type("{esc}");

		cy.get(
			'[data-cy="menu-icon"] button.css-146st0g-JoyIconButton-root'
		).click();
		cy.get('[data-cy="side-menu"] a[href="/categories"]').click();
	});

	/* it("logging in and browsing", function () {
		cy.visit("/");
		cy.wait(500); // Wait for initial page load

		cy.get('[data-cy="home-container"] a').click();
		cy.get('#root a[href="/categories/Kayak"] h2.absolute').click();
		cy.get('img[alt="Nouria Newman"]').click();

		cy.get("Log in").click();
		cy.wait(500);

		cy.get('[data-cy="login-form"] [name="email"]')
			.should("be.visible")
			.first()
			.type("hi@greg.com");
		cy.get('[data-cy="login-form"] [name="password"]')
			.should("be.visible")
			.first()
			.type("Pass1234%");
		cy.get('[data-cy="login-form"] button').contains("Log in").click();

		// Wait for login to complete
		cy.url().should("include", "/feed");
		cy.wait(1000); // Wait for feed to load

		cy.get("#root img.w-12").click();
		cy.get('[data-cy="home-container"] a').click();
		cy.get('#root a[href="/categories/Bike"] h2.absolute').click();
		cy.get('img[alt="Rachel Atherton"]').click();

		// Wait for athlete page to load
		cy.wait(500);

		// Simplified - just check if we can interact with the page
		cy.get("body").then(($body) => {
			if ($body.text().includes("Join the Circle")) {
				cy.contains("Join the Circle").click();
				cy.wait(500); // Wait for subscription modal
				cy.get('[data-cy="Silver"]').should("be.visible").first().click();
				cy.contains("Confirm Subscription").click();
				cy.wait(500); // Wait for subscription to process
			}
		});

		cy.get('[data-testid="MenuOutlinedIcon"]').click();
		cy.get('[data-cy="side-menu"] a[href="/profile"]').click();
		cy.wait(500); // Wait for profile to load

		cy.get('[data-testid="MenuOutlinedIcon"]').click();
		cy.get('[data-cy="side-menu"] a[href="/"]').click();

		cy.get('[data-cy="home-container"] a').click();
		cy.get('#root a[href="/categories"]').click();

		cy.get('[data-testid="MenuOutlinedIcon"]').click();
		cy.get('[data-cy="side-menu"] a[href="/about"]').click();

		cy.get('#root a[href="/terms"]').click();
		cy.get("#root img.w-12").click();

		cy.get('[data-testid="MenuOutlinedIcon"]').click();
		cy.get('[data-cy="side-menu"] a[href="/faq"]').click();

		cy.get('#root a[href="/privacy"]').click();

		cy.get('[data-cy="menu-icon"] button').click();
		cy.get('[data-cy="side-menu"] a[href="/feed"]').click();

		cy.get('[data-testid="MenuOutlinedIcon"]').click();
		cy.get('[data-cy="side-menu"] button').contains("Log out").click();

		cy.get('[data-cy="home-container"] a').click();
	}); */
});
