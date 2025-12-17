context("Join the circle or manage subscription", () => {
	beforeEach(() => {
		cy.clearLocalStorage();
		cy.visit("/");
	});

	it("goes to the site", () => {
		cy.get("[data-cy='join-the-circle'] h2").should(
			"contain.text",
			"Become a part of Candide Thovex circle to access the exclusive content"
		);
		cy.get("[data-cy='join-the-circle']")
			.children()
			.last()
			.find("button")
			.should("have.text", "STEP INSIDE")
			.click();
		cy.get("[data-cy='sign-up-form']:visible").should("exist");
	});
});

it("profile-test1", function () {});

it("Changing name, payment and avatar in profile settings", function () {
	cy.visit("/");
	cy.get('[data-testid="MenuOutlinedIcon"]').click();
	cy.get('[data-cy="side-menu"] a[href="/feed"]').click();
	cy.get("#root button.css-5wpb4w-JoyButton-root").click();
	cy.get('[data-cy="menu-icon"] button.css-146st0g-JoyIconButton-root').click();
	cy.get('[data-cy="side-menu"] a[href="/"]').click();
	cy.get(
		'[data-cy="auth-modal-buttons"] button.css-bgryco-JoyButton-root'
	).click();
	cy.get(
		'div.css-9t7b50-JoyDrawer-root:nth-of-type(3) [data-cy="login-form"] [name="email"]'
	).click();
	cy.get(
		'div.css-9t7b50-JoyDrawer-root:nth-of-type(3) [data-cy="login-form"] [name="email"]'
	).type("hi@greg.com");
	cy.get(
		'div.css-9t7b50-JoyDrawer-root:nth-of-type(3) [data-cy="login-form"] [name="password"]'
	).click();
	cy.get(
		'div.css-9t7b50-JoyDrawer-root:nth-of-type(3) [data-cy="login-form"] [name="password"]'
	).type("Pass1234%");
	cy.get('[data-cy="login-form"] button.css-1nw8vrb-JoyButton-root').click();
	cy.get('[data-testid="MenuOutlinedIcon"]').click();
	cy.get('[data-cy="side-menu"] a[href="/about"]').click();
	cy.get('[data-cy="menu-icon"] button.css-146st0g-JoyIconButton-root').click();
	cy.get('[data-cy="side-menu"] a[href="/profile"]').click();
	cy.get(
		"#root div.css-hjmatl-JoyAccordion-root button.css-17bs4i0-JoyAccordionSummary-button"
	).click();
	cy.get('#root input[placeholder="ggt"]').click();
	cy.get('#root input[placeholder="ggt"]').clear();
	cy.get('#root input[placeholder="ggt"]').type("Greg von Testery");
	cy.get("#root button.css-367a25-JoyButton-root").click();
	cy.get(
		"#root div.css-134drpz-JoyAccordion-root button.css-17bs4i0-JoyAccordionSummary-button"
	).click();
	cy.get("#root select.profile-input").select("MASTERCARD");
	cy.get("#root button.css-367a25-JoyButton-root").click();
	cy.get('[data-testid="MenuOutlinedIcon"] path').click();
	cy.get('[data-cy="side-menu"] a[href="/categories"]').click();
	cy.get('#root a[href="/categories/Fly"] h2.absolute').click();
	cy.get('img[alt="Luke Aikins"]').click();
	cy.get('[data-testid="MenuOutlinedIcon"]').click();
	cy.get('[data-cy="side-menu"] a[href="/profile"]').click();
	cy.get('[data-testid="change-avatar-btn"] circle').click();
	cy.get('[data-testid="save-avatar-btn"]').click();
	cy.get(
		'div.css-hjmatl-JoyAccordion-root [data-testid="KeyboardArrowDownIcon"]'
	).click();
	cy.get(
		"#root div.css-134drpz-JoyAccordion-root button.css-17bs4i0-JoyAccordionSummary-button"
	).click();
	cy.get('#root button[aria-expanded="false"]').click();
	cy.get(
		"#root div.css-18ew08l-JoyAccordion-root button.css-17bs4i0-JoyAccordionSummary-button"
	).click();
	cy.get(
		"#root div.css-134drpz-JoyAccordion-root button.css-17bs4i0-JoyAccordionSummary-button"
	).click();
	cy.get('#root button[aria-expanded="true"]').click();
	cy.get('img[alt="Candide Thovex"]').click();
	cy.get('[data-testid="MenuOutlinedIcon"] path').click();
	cy.get('[data-cy="side-menu"] button.css-1lcyxbv-JoyButton-root').click();
});
