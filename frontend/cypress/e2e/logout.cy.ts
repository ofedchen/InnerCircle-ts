/// <reference types="cypress" />

context("Logout", () => {
  const mockUserId = "id-1";

  it("clears local storage userId", () => {
    localStorage.setItem("userId", mockUserId);

    cy.visit("/");
    cy.get("[data-cy='menu-icon']").find("button").click();
    cy.get("[data-cy='side-menu']")
      .find("button")
      .should("have.text", "LOG OUT")
      .click();
    cy.clearLocalStorage();
    cy.getAllLocalStorage().should(() => {
      expect(localStorage.getItem("userId")).to.be.null;
    });
  });
});
