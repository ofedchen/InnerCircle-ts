import React from "react";
import Comment from "../../src/components/Comment.tsx";

const comment = {
  author: "  ben franklin",
  commentText: "The best video ever made, thank you",
  date: new Date(Date.now()),
};

const date = comment.date.toLocaleString("fr-FR", {
  dateStyle: "short",
  timeStyle: "short",
});

beforeEach(function () {
  cy.mount(
    <Comment
      date={comment.date}
      author={comment.author}
      commentText={comment.commentText}
    />
  );
});

describe("Comment component", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
  });

  it("has an h3 element and a p element", function () {
    cy.get("[data-cy='comment-author']").should("exist");
    cy.get("[data-cy='comment-text']").should("exist");
  });

  it("has an h4 element that contains date", function () {
    const date = comment.date.toLocaleString("fr-FR", {
      dateStyle: "short",
      timeStyle: "short",
    });
    cy.get("[data-cy='comment-date']")
      .should("exist")
      .should("contain", "Date: ")
      .should("contain", date);
  });

  it("renders correct comment author, text and date from props", function () {
    cy.get("[data-cy='comment-author']").should("have.text", "ben franklin");
    cy.get("[data-cy='comment-text']").should(
      "contain",
      "The best video ever made, thank you"
    );
    cy.get("[data-cy='comment-date']")
      .should("exist")
      .should("contain", "Date: ")
      .should("contain", date);
  });

  it("shows the first letter of user initials in avatar", function () {
    cy.get("[data-cy='comment-avatar']")
      .should("exist")
      .should("contain.text", "B");
  });

  it("shows 2 letters of user initials if the username is more than 1 word", function () {
    cy.get("[data-cy='comment-avatar']")
      .should("exist")
      .should("have.text", "BF");
  });

    it("shows correct user initials if the username contains spaces in the beginning", function () {
    cy.get("[data-cy='comment-avatar']")
      .should("exist")
      .should("have.text", "BF");
  });
});
