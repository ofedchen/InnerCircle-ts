/// <reference types="cypress" />

context("Logout", () => {
  const mockUserId = "id-1";

  it("clears local storage userId", () => {
    cy.visit("/");
    cy.window().then((window) => {
      window.localStorage.setItem("userId", mockUserId);
    });
    cy.get("[data-cy='menu-icon']").find("button").click();
    cy.get("[data-cy='side-menu']")
      .find("button")
      .should("have.text", "LOG OUT")
      .click();

    cy.window().then((window) => {
      expect(window.localStorage.getItem("userId")).to.be.null;
    });
  });
});
