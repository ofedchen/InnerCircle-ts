import React from "react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import PostRoute from "../../src/routes/Post_Route.js";
import { UserProvider } from "../../src/contexts/UserProvider.tsx";

describe("<PostRoute />", () => {
  const mockPostId = 1;
  const mockUserId = "id-1";

  beforeEach(() => {
    localStorage.setItem("userId", mockUserId);

    cy.intercept("GET", `/api/posts/${mockPostId}`, {
      fixture: "postRoute.json",
    }).as("getPost");

    cy.intercept("GET", `/api/comments/${mockPostId}`, {
      fixture: "comments.json",
    }).as("getComments");

    cy.intercept("GET", `/api/user-circles/${mockUserId}`, {
      fixture: "user-circles.json",
    }).as("getUserCircles");

    cy.mount(
      <UserProvider>
        <MemoryRouter initialEntries={[`/feed/${mockPostId}`]}>
          <Routes>
            <Route path="/feed/:postId" element={<PostRoute />} />
          </Routes>
        </MemoryRouter>
      </UserProvider>
    );
  });

  it("renders the post route", () => {
    cy.get("[data-cy='post']").should("exist");
    cy.get("[data-cy='post-details']").should("exist");
  });

  it("fetches post data with correct post ID", () => {
    cy.wait("@getPost")
      .its("request.url")
      .should("include", `/api/posts/${mockPostId}`);
  });

  it("fetches comments for the post", () => {
    cy.wait("@getComments")
      .its("request.url")
      .should("include", `/api/comments/${mockPostId}`);
  });

  it("displays post author avatar", () => {
    cy.get("[data-testid='avatar']")
      .should("be.visible")
      .find("p")
      .should("have.text", "Kelly Slater");
    cy.get("[data-testid='avatar']")
      .find("img")
      .should("exist")
      .should("have.attr", "src", "/images/athletes/kelly-slater.webp");
  });

  it("avatar links to circle page", () => {
    cy.wait("@getPost");
    cy.fixture("postRoute.json").then((post) => {
      cy.get("[data-testid='avatar']")
        .parent("a")
        .should(
          "have.attr",
          "href",
          `/circle/${post.post_author}/${post.circle_slug}`
        );
    });
  });

  it("displays post content from fixture", () => {
    cy.get("[data-testid='avatar']")
      .should("be.visible")
      .find("p")
      .should("have.text", "Kelly Slater");
    cy.get("[data-cy='post-title']")
      .should("be.visible")
      .should("contain", "Chasing Perfect Waves");
    cy.get("[data-cy='post-text']")
      .should("be.visible")
      .should("contain", "Behind the scenes of my latest surf trip to Tahiti.");
    cy.get("[data-cy='post-details']")
      .find("img")
      .should("have.attr", "src", "/images/posts/1_wave.jpg");
  });

  it("displays comments from fixture", () => {
    cy.get("[data-cy='comments']").should("exist");
    cy.fixture("comments.json").then((comments) => {
      if (comments.length > 0) {
        cy.get("[data-cy='comment']").should("have.length.at.least", 1);
      } else {
        cy.get("[data-cy='comments']")
          .find("p")
          .should("contain", "No comments yet");
      }
    });
  });

  it("fetches user circles", () => {
    cy.wait("@getUserCircles")
      .its("request.url")
      .should("include", `/api/user-circles/${mockUserId}`);
  });
});
