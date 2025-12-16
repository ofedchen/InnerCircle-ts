/// <reference types="cypress" />

context("Signup", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-cy='home-container']")
      .children()
      .last()
      .find("button")
      .should("have.text", "SIGN UP")
      .click();
  });

  it("renders sign up form", () => {
    cy.get("[data-cy='sign-up-container']:visible")
      .find("h2")
      .should("contain.text", "Sign up");
    cy.get("[data-cy='sign-up-form']:visible").should("exist");
    cy.get("[data-cy='sign-up-form']:visible")
      .find("input[name='userName']")
      .should("exist");
    cy.get("[data-cy='sign-up-form']:visible")
      .find("input[name='email']")
      .should("exist");
    cy.get("[data-cy='sign-up-form']:visible")
      .find("input[name='password']")
      .should("exist");
    cy.get("[data-cy='repeat-pw']").should("exist");
    cy.get("[data-cy='sign-up-form']:visible")
      .find("button")
      .should("have.text", "Sign up")
      .should("be.disabled");
  });

  it("checkbox is not visible before filling in all the fields", () => {
    cy.get("[data-cy='checkbox']").should("not.exist");
  });

  it("can close the signup modal", () => {
    cy.get("[data-cy='sign-up-container']:visible").should("exist");
    cy.get("body").type("{esc}");
    cy.get("[data-cy='sign-up-container']").should("not.be.visible");
  });

  it("can switch to login modal", () => {
    cy.get("[data-cy='switch-to-login']:visible").click();
    cy.get("[data-cy='login-container']:visible").should("exist");
    cy.get("[data-cy='sign-up-container']").should("not.be.visible");
  });

  it("fills in sign up form without errors and checks the checkbox", () => {
    const newUser = {
      userName: "Vanja",
      email: "vanja@nejla.com",
      password: "Test1234%",
    };

    cy.get("[data-cy='sign-up-form']:visible input[name='userName']").type(
      newUser.userName
    );
    cy.get("[data-cy='sign-up-form']:visible input[name='email']").type(
      newUser.email
    );
    cy.get("[data-cy='sign-up-form']:visible input[name='password']").type(
      newUser.password
    );
    cy.get("[data-cy='repeat-pw']:visible").type(newUser.password);
    cy.get("[data-cy='pw-error']").should("contain", "✓");
    cy.get("[data-cy='checkbox']:visible")
      .find("input[type='checkbox']")
      .check();
    cy.get("[data-cy='sign-up-form']:visible")
      .find("button")
      .should("not.be.disabled");
  });

  it("fills in sign up form with errors", () => {
    const newUser = {
      userName: "Va",
      email: "vanja@nejlacom",
      password: "test1234",
    };

    cy.get("[data-cy='sign-up-form']:visible input[name='userName']").type(
      newUser.userName
    );
    cy.get("[data-cy='username-err']").should(
      "contain.text",
      "Please enter your name"
    );
    cy.get("[data-cy='sign-up-form']:visible input[name='email']").type(
      newUser.email
    );
    cy.get("[data-cy='email-err']").should(
      "contain.text",
      "Please enter a valid email"
    );
    cy.get("[data-cy='sign-up-form']:visible input[name='password']").type(
      newUser.password
    );
    cy.get("[data-cy='pw-error']").should(
      "contain.text",
      "8-24 characters with uppercase, lowercase, number, and special character (!@#$%()&)"
    );
    cy.get("[data-cy='repeat-pw']:visible").type("test1234%");
    cy.get("[data-cy='repeat-pw-error']").should(
      "contain.text",
      "Passwords do not match, try again"
    );
    cy.get("[data-cy='checkbox']").should("not.exist");
    cy.get("[data-cy='sign-up-form']:visible")
      .find("button")
      .should("be.disabled");
  });

  it("successfully signs up a new user and redirects", () => {
    const newUser = {
      userName: "TestUser",
      email: `test${Date.now()}@example.com`,
      password: "Test1234%",
    };

    cy.get("[data-cy='sign-up-form']:visible input[name='userName']").type(
      newUser.userName
    );
    cy.get("[data-cy='sign-up-form']:visible input[name='email']").type(
      newUser.email
    );
    cy.get("[data-cy='sign-up-form']:visible input[name='password']").type(
      newUser.password
    );
    cy.get("[data-cy='repeat-pw']:visible").type(newUser.password);
    cy.get("[data-cy='checkbox']:visible")
      .find("input[type='checkbox']")
      .check();
    cy.get("[data-cy='sign-up-form']:visible").find("button").click();

    cy.url().should("include", "/feed");

    cy.getAllLocalStorage().then((result) => {
      const userId = result[Cypress.config().baseUrl!]?.userId;
      if (userId) {
        cy.request("DELETE", `/api/users/${userId}`);
      }
    });
  });

  it("displays server error when email already exists", () => {
    const existingUser = {
      userName: "ExistingUser",
      email: "greg@gregmail.com",
      password: "Test1234%",
    };

    cy.get("[data-cy='sign-up-form']:visible input[name='userName']").type(
      existingUser.userName
    );
    cy.get("[data-cy='sign-up-form']:visible input[name='email']").type(
      existingUser.email
    );
    cy.get("[data-cy='sign-up-form']:visible input[name='password']").type(
      existingUser.password
    );
    cy.get("[data-cy='repeat-pw']:visible").type(existingUser.password);
    cy.get("[data-cy='checkbox']:visible")
      .find("input[type='checkbox']")
      .check();
    cy.get("[data-cy='sign-up-form']:visible").find("button").click();

    cy.get("[data-cy='error-response']").should("exist");
  });
});
