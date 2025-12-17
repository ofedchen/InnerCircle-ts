import React from "react";
import type { Tier } from "../../src/types.ts";
import Post from "../../src/components/Post.tsx";
import type { PostProps } from "../../src/components/Post.tsx";
import { BrowserRouter } from "react-router-dom";

const mockPostWithVideo: PostProps = {
	slug: "my-video-post",
	circleId: 1,
	title: "The flight of my life",
	text: "This is a post with a YouTube video",
	tier: "Gold",
	postId: 1,
	video: "dQw4w9WgXcQ",
	avatar: "https://i.pravatar.cc/150?",
	blurred: false,
};

const mockPostWithImage: PostProps = {
	slug: "my-image-post",
	circleId: 1,
	title: "Deep Powder in the magic forest",
	text: "What an absolutely incredible day shredding the Magic Forest at Grand Montets with the crew! Fresh pow, perfect visibility, and five of us absolutely sending it down the mountain. The snow was buttery smooth and deep - we couldn't have asked for better conditions. Days like this remind us why we love the mountains.",
	tier: "Silver",
	postId: 2,
	postImg: "https://images.unsplash.com/photo-1507534192483-69914c0692d7",
	avatar: "https://i.pravatar.cc/150?",
	blurred: false,
};

const mockPostTextOnly: PostProps = {
	slug: "text-post",
	circleId: 1,
	title: "Off season training can be fun as *#(!#",
	text: "Staying strong and ready for monster waves requires a mix of strength, endurance, and mental focus. Each session pushes the body and mind, preparing for unpredictable conditions. Proper nutrition, recovery, and visualization techniques are as important as time spent on the water. Surfing has taught me discipline, patience, and creativity that extend beyond the ocean.",
	tier: "Bronze",
	postId: 3,
	avatar: "https://i.pravatar.cc/150?",
	blurred: false,
};

const mockPostBlurred: PostProps = {
	slug: "blurred-post",
	circleId: 1,
	title: "Premium Content",
	text: "This content is blurred because you don't have access",
	tier: "Gold",
	postId: 4,
	postImg: "https://images.unsplash.com/photo-1507534192483-69914c0692d7",
	avatar: "https://i.pravatar.cc/150?",
	blurred: true,
};
describe("PostComponent tests", () => {
	const renderPost = (postProps: PostProps) => {
		cy.mount(
			<BrowserRouter>
				<div
					style={{
						backgroundColor: "#201c36",
						padding: "40px",
						minHeight: "100vh",
						display: "flex",
						justifyContent: "center",
						alignItems: "flex-start",
					}}
				>
					<div style={{ width: "100%", maxWidth: "600px" }}>
						<Post {...postProps} />
					</div>
				</div>
			</BrowserRouter>
		);
	};

	beforeEach(() => {
		cy.viewport(880, 680);
	});

	it("renders all elements of the component when it is not blurred", () => {
		renderPost(mockPostWithVideo);
		cy.get("[data-cy='post-wrapper']").should("exist");
		cy.get("[data-cy='post-link']").should("exist");
		cy.get("[data-cy='avatar-img']").should("exist");
		cy.get("[data-cy='post-video']").should("exist");
		cy.get("[data-cy='post-title']").should("exist");
		cy.get("[data-cy='post-text']").should("exist");
		cy.get("[data-cy='post-button']").should("exist");
		cy.get("[data-cy='avatar-img']").should("have.css", "border-color");
	});

	it("renders a post with image", () => {
		renderPost(mockPostWithImage);
		cy.get("[data-cy='post-image']").should("exist");
	});

	it("renders a text-only post", () => {
		renderPost(mockPostTextOnly);
		cy.get("h3").should("contain.text", "Off season training can be fun");
		cy.get("[data-cy='post-image']").should("not.exist");
		cy.get("[data-cy='post-video']").should("not.exist");
	});

	it("blurs content when blurred is true", () => {
		renderPost(mockPostBlurred);
		cy.get('[id="post-content"]').should("have.class", "blur-sm");
		cy.get("[data-cy='avatar']").should(
			"have.css",
			"--avatar-border",
			"transparent"
		);
	});
});
