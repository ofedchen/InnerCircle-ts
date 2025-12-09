import ChangeAvatar from "../../src/components/ChangeAvatar";

describe("ChangeAvatar.cy.jsx", () => {
	it("renders a button for the avatar change", () => {
		cy.mount(<ChangeAvatar />);
		cy.get('[data-testid="change-avatar-btn"]').should("be.visible");
	});

	it("lets the user click the button to browse for files", () => {
		cy.mount(<ChangeAvatar />);
		cy.get('[data-testid="change-avatar-btn"]').click();
	});

	it("shows a message after image is uploaded", () => {
		cy.mount(<ChangeAvatar />);
		cy.get('[data-testid="change-avatar-btn"]').click();
		cy.get('[data-testid="change-avatar-success-msg"]').should(
			"contain.text",
			"you're avatar has been changed"
		);
	});
});

/* 
psuedo code for tdd ChangeAvatar. 

button with symbol + is on profilepage, it has test-id=”change-avatar-btn”. click()
select file, upload(). 
multer will change name on file  so that is smiliar to circle-slug but add suffix number. 
multer removes the old avtarfile. 
imgsrc in avatar will be set to use the new file name. 
new avatar will be dislpayed in profile page. 

expect 
cy. image (circle_avatar) toBeVisible on page.  */
