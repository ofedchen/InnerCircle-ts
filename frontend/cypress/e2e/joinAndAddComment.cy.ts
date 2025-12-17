describe("template spec", () => {
  const testUserId = "cc626854-6f26-452d-8ce5-a987bf9827fa";

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.request(
      "GET",
      `http://localhost:3000/api/user-circles/${testUserId}`
    ).then((response) => {
      const userCircle = response.body.find((uc: any) => uc.circle_id);
      if (userCircle && userCircle.uc_id) {
        cy.request("DELETE", `/api/user-circles/${userCircle.uc_id}`);
      }
    });

    cy.request("DELETE", `http://localhost:3000/api/comments/${testUserId}`);
  });

  it("Log in, join the circle and leave a comment", function () {
    cy.visit("/");
    cy.get('[data-cy="home-container"] a').click();
    cy.get('#root a[href="/categories/Climb"] h2.absolute').click();
    cy.get('img[alt="Tommy Caldwell"]').click();
    cy.get(
      'section:nth-child(2) > [data-cy="auth-modal-buttons"] > button.css-5wpb4w-JoyButton-root'
    ).click();
    cy.get(
      'div.css-1idhl6t-JoyDrawer-content [data-cy="switch-to-login"]'
    ).click();
    cy.get('div:nth-of-type(8) [data-cy="login-form"] [name="email"]').click();
    cy.get('div:nth-of-type(8) [data-cy="login-form"] [name="email"]').type(
      "no@ob.com"
    );
    cy.get(
      'div:nth-of-type(8) [data-cy="login-form"] [name="password"]'
    ).click();
    cy.get('div:nth-of-type(8) [data-cy="login-form"] [name="password"]').type(
      "Pass1234%"
    );
    cy.get('[data-cy="login-form"] button.css-1nw8vrb-JoyButton-root').click();
    cy.get('div.css-1idhl6t-JoyDrawer-content [data-cy="Silver"]').click();
    cy.get("button.css-102riv4-JoyButton-root").click();
    cy.get('[data-cy="post-button"]').click();
    cy.get("#new-comment").click();
    cy.get("#new-comment").type("dawn wall - that's so inspiring!");
    cy.get('[data-cy="add-comment"] button.css-1r5wnwm-JoyButton-root').click();
    cy.get('[data-testid="MenuOutlinedIcon"]').click();
    cy.get('[data-cy="side-menu"] a[href="/feed"]').click();
    cy.get('[data-testid="MenuOutlinedIcon"]').click();
    cy.get('[data-cy="side-menu"] a[href="/categories"]').click();
    cy.get('#root a[href="/categories/Snow"] h2.absolute').click();
    cy.get('img[alt="Shaun White"]').click();
  });
});
