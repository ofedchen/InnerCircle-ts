/// <reference types="cypress" />

context("Join the circle or manage subscription", () => {
  const existingUser = {
    userId: "5884dd82-5323-4bb4-b85a-96df69b2d7ac",
    email: "god@jul.com",
    password: "Pass1234%",
  };

  beforeEach(() => {
    cy.visit("/circle/5/candide-thovex");
  });

  it("toggles the sign up modal if the user is not logged in", () => {
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

  it("toggles login on click and after success opens join modal if the user is not a member", () => {
    cy.get("[data-cy='join-the-circle']")
      .children()
      .last()
      .find("button")
      .should("have.text", "STEP INSIDE")
      .click();
    cy.get("[data-cy='switch-to-login']:visible").click();
    cy.get("[data-cy='login-container']:visible").should("exist");

    cy.get("[data-cy='login-form']:visible input[name='email']").type(
      existingUser.email
    );
    cy.get("[data-cy='login-form']:visible input[name='password']").type(
      existingUser.password
    );
    cy.get("[data-cy='login-form']:visible button[type='submit']").click();

    cy.get("[data-cy='join-modal']").should("be.visible");
    cy.url().should("not.include", "feed");
  });

  it("successfully joins the logged in user who was not yet a member", () => {
    cy.request("GET", `/api/user-circles/${existingUser.userId}`).then(
      (response) => {
        if (response.body && response.body.uc_id) {
          cy.request("DELETE", `/api/user-circles/${response.body.uc_id}`);
        }
      }
    );

    localStorage.setItem("userId", existingUser.userId);

    cy.get("[data-cy='join-the-circle']")
      .children()
      .last()
      .find("button")
      .click();
    cy.get("[data-cy='Gold']:visible")
      .should("be.visible")
      .click()
      .should("have.css", "background-color", "rgb(255, 235, 194)");
    cy.get("[data-cy='subscribe']:visible").click();

    cy.get("[data-cy='membership']")
      .should("exist")
      .find("h2")
      .should("contain.text", "You are a member of Candide Thovex circle");
  });

  it("cancels leaving the circle without cancelling subscription", () => {
    cy.request("POST", "/api/user-circles/", {
      userId: existingUser.userId,
      circleId: 5,
      circleTier: "Gold",
    });

    localStorage.setItem("userId", existingUser.userId);

    cy.get("[data-cy='membership']").children().last().find("button").click();
    cy.get("[data-cy='manage-subscription']:visible")
      .find("button[type='submit']")
      .click();
    cy.get("[data-cy='confirm-cancel']")
      .should("exist")
      .find("button")
      .contains("Cancel")
      .click();
    cy.get("body").type("{esc}");

    cy.get("[data-cy='membership']").should("exist");
  });

  it("successfully cancels the membership", () => {
    cy.request("POST", "/api/user-circles/", {
      userId: existingUser.userId,
      circleId: 5,
      circleTier: "Gold",
    });

    localStorage.setItem("userId", existingUser.userId);

    cy.get("[data-cy='membership']").children().last().find("button").click();
    cy.get("[data-cy='manage-subscription']:visible")
      .find("button[type='submit']")
      .click();
    cy.get("[data-cy='confirm-cancel']")
      .should("exist")
      .find("button")
      .contains("Leave circle")
      .click();

    cy.get("[data-cy='membership']").should("not.exist");
  });
});
