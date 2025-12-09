import ChangeAvatar from "../../src/components/ChangeAvatar.tsx";

describe("ChangeAvatar.cy.jsx",
	() => {
		it("renders a button for the avatar change", () => {
			cy.mount(ChangeAvatar);
      cy.get('[data-testid="change-avatar-btn"]').should('be.visible')
		});
	};
)