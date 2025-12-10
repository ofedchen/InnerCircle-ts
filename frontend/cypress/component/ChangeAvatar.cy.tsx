import ChangeAvatar from "../../src/components/ChangeAvatar";
import { UserProvider } from "../../src/contexts/UserProvider";

describe("ChangeAvatar.cy.jsx", () => {
	const mockUserId = "2";
	const mockUsername = "sverker olofsson";

	it("renders a button for the avatar change", () => {
		cy.mount(<ChangeAvatar />);
		cy.get('[data-testid="change-avatar-btn"]').should("be.visible");
	});

	it("lets the user click the button to browse for files", () => {
		cy.mount(<ChangeAvatar />);
		cy.get('[data-testid="change-avatar-btn"]').click();
	});

	it("checks so that the user doesnt upload something that isnt an image", () => {
		cy.mount(<ChangeAvatar />);
		cy.get('input[type="file"]').selectFile(
			{
				contents: Cypress.Buffer.from("not an image content"),
				fileName: "document.txt",
				mimeType: "text/plain",
			},
			{ force: true }
		);

		cy.get('[data-testid="change-avatar-error-msg"]').should(
			"contain.text",
			"you need to upload an image"
		);
	});

	it("shows a message after image is uploaded", () => {
		cy.mount(<ChangeAvatar />);

		cy.get('input[type="file"]').selectFile(
			{
				contents: Cypress.Buffer.from("fake image data"),
				fileName: "avatar.jpg",
				mimeType: "image/jpeg",
			},
			{ force: true }
		);

		cy.get('[data-testid="change-avatar-success-msg"]').should(
			"contain.text",
			"you're avatar has been changed"
		);
	});

	it(" can't find save button before file is selected", () => {
		cy.mount(<ChangeAvatar />);
		cy.get('[data-testid="save-avatar-btn"]').should("not.be.visible");
	});

	it("finds save button when file is selected", () => {
		cy.mount(<ChangeAvatar />);
		cy.get('input[type="file"]').selectFile(
			{
				contents: Cypress.Buffer.from("fake image data"),
				fileName: "avatar. jpg",
				mimeType: "image/jpeg",
			},
			{ force: true }
		);

		cy.get('[data-testid="save-avatar-btn"]').should("be.visable");
	});

	it("renames file to username after upload", () => {
		cy.mount(<ChangeAvatar />);
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
