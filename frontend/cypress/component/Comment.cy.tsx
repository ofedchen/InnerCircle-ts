import React from "react";
import Comment from "../../src/components/Comment.tsx";

const comment = {
  author: "Ben",
  commentText: "The best video ever made, thank you",
  date: new Date(Date.now()),
};

const date = comment.date.toLocaleString("fr-FR", {
  dateStyle: "short",
  timeStyle: "short",
});

// const initial = comment.author.charAt(0).toUpperCase()

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
    cy.get("[data-cy='comment-author']").should("have.text", "Ben");
    cy.get("[data-cy='comment-text']").should(
      "contain",
      "The best video ever made, thank you"
    );
    cy.get("[data-cy='comment-date']")
      .should("exist")
      .should("contain", "Date: ")
      .should("contain", date);
  });

  it("shows user initials in avatar", function() {
    cy.get("[data-cy='comment-avatar']").should("exist").should("have.text", "B")
  })
});
