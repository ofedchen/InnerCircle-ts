import ChangeAvatar from "../../src/components/ChangeAvatar.tsx";

describe("ChangeAvatar.cy.jsx", () => {
	const mockUserId = "2";
	const mockUsername = "sverker olofsson";

	beforeEach(() => {
		cy.mount(
			<div
				style={{
					backgroundColor: "#504785",
					paddingTop: "200px",
					paddingRight: "220px",
					height: "100vh",
				}}
			>
				<ChangeAvatar userId={mockUserId} />
			</div>
		);
	});

	it("renders a button for the avatar change", () => {
		cy.get('[data-testid="change-avatar-btn"]').should("be.visible");
	});

	it("lets the user click the button to browse for files", () => {
		cy.get('[data-testid="change-avatar-btn"]').click();
	});

	it("checks so that the user doesnt upload something that isnt an image", () => {
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
			"Not a valid image, please try another file."
		);
	});

	it("shows a message after image is uploaded", () => {
		const mockAvatarPath = "/avatars/sverker_olofsson.jpg";
		cy.intercept("POST", "/api/users/2/avatar", {
			statusCode: 200,
			body: {
				success: true,
				avatarPath: mockAvatarPath,
				message: "Avatar uploaded successfully",
			},
		}).as("uploadAvatar");

		cy.get('input[type="file"]').selectFile(
			{
				contents: Cypress.Buffer.from("fake image data"),
				fileName: "DSC3210.jpg",
				mimeType: "image/jpeg",
			},
			{ force: true }
		);

		cy.get('[data-testid="save-avatar-btn"]').click();
		cy.wait("@uploadAvatar");

		cy.get('[data-testid="change-avatar-success-msg"]').should(
			"contain.text",
			"Your avatar is changed!"
		);
	});

	it(" can't find save button before file is selected", () => {
		cy.get('[data-testid="save-avatar-btn"]').should("not.exist");
	});

	it("finds save button when file is selected", () => {
		cy.get('input[type="file"]').selectFile(
			{
				contents: Cypress.Buffer.from("fake image data"),
				fileName: "avatar. jpg",
				mimeType: "image/jpeg",
			},
			{ force: true }
		);

		cy.get('[data-testid="save-avatar-btn"]').should("exist");
	});

	it("renames file to username after upload", () => {
		const mockAvatarPath = "/avatars/sverker_olofsson.jpg";
		cy.intercept("POST", "/api/users/2/avatar", {
			statusCode: 200,
			body: {
				success: true,
				avatarPath: mockAvatarPath,
				message: "Avatar uploaded successfully",
			},
		}).as("uploadAvatar");

		cy.get('input[type="file"]').selectFile(
			{
				contents: Cypress.Buffer.from("fake image data"),
				fileName: "DSC3210.jpg",
				mimeType: "image/jpeg",
			},
			{ force: true }
		);

		cy.get('[data-testid="save-avatar-btn"]').click();
		cy.wait("@uploadAvatar").then((interception) => {
			expect(interception.response?.statusCode).to.equal(200);
			expect(interception.response?.body.avatarPath).to.include(
				"sverker_olofsson"
			);
		});
	});
});
