context("Log in, do some changes to the profile ", () => {
	const initialName = "Greg Lourloop";
	const newName = "Greg New Namely";
	let realUserId = "13a8046d-89ca-44c8-8e7d-f322191f7d9c";

	beforeEach(() => {
		cy.clearLocalStorage();

		cy.intercept("GET", "/api/users/*", (req) => {
			if (realUserId && req.url.includes(realUserId)) {
				req.reply({
					statusCode: 200,
					body: {
						users_id: realUserId,
						users_name: initialName,
						users_email: "hi@greg.com",
						users_payment: "VISA",
						users_avatar: "images/users/Greg_van_Avatary.webp",
					},
				});
			} else {
				req.continue();
			}
		}).as("getUserData");

		cy.visit("/");
	});

	it("login and change name in profile", function () {
		cy.get(
			'[data-cy="menu-icon"] button.css-146st0g-JoyIconButton-root'
		).click();
		cy.get('[data-cy="side-menu"] a[href="/feed"]').click();
		cy.get(
			'[data-cy="auth-modal-buttons"] button.css-bgryco-JoyButton-root'
		).click();
		cy.get('[data-cy="login-form"] [name="email"]').type("hi@greg.com");
		cy.get('[data-cy="login-form"] [name="password"]').type("Pass1234%");
		cy.get('[data-cy="login-form"] button.css-1nw8vrb-JoyButton-root').click();

		cy.url().should("include", "/feed");

		cy.window()
			.its("localStorage.userId")
			.then((userId) => {
				realUserId = userId;
			});

		cy.get('[data-testid="MenuOutlinedIcon"]').click();
		cy.get('[data-cy="side-menu"] a[href="/profile"]').click();

		cy.wait("@getUserData");

		cy.get('[data-cy="acc-details-button"]').click();

		cy.get('[data-cy="profile-name-input"]').should("have.value", initialName);
		cy.get('[data-cy="profile-name-input"]').clear();
		cy.get('[data-cy="profile-name-input"]').type(newName);

		cy.get('[data-cy="profile-save-button"]').should("be.visible").click();

		cy.get("#profile-hero h2:nth-child(2)").should("contain", newName);

		cy.reload();

		cy.get('[data-cy="acc-payment-button"]').click();
		cy.get('[data-cy="profile-payment-selector"]').select("KLARNA");

		cy.get('[data-cy="profile-save-button"]').click();

		cy.get('[data-cy="acc-payment-button"]').click();

		cy.get('[data-cy="acc-details-button"]').click();
		cy.get('[data-cy="profile-name-input"]').clear();
		cy.get('[data-cy="profile-name-input"]').type("Greg Dinkelstein");

		cy.get('[data-cy="profile-save-button"]').click();

		cy.get("#profile-hero h2:nth-child(2)").should(
			"contain",
			"Greg Dinkelstein"
		);
	});
});
