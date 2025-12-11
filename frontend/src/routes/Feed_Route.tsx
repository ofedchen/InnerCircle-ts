import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@mui/joy";
import Post from "../components/Post";
import { useUser } from "../hooks/useUser";
import type { PostMediaProps, FeedPost } from "../types";

export default function Feed() {
	const [feedPost, setCircles] = useState<FeedPost[]>([]);
	const [isMember, setIsMember] = useState<boolean>(false);
	const { userId } = useUser();

	const isLoggedIn: boolean = !!userId;

	useEffect(() => {
		if (userId) {
			fetch(`/api/user-circles/feed/${userId}`)
				.then((response) => response.json())
				.then((result) => {
					if (result.length > 0) {
						setCircles(result);
						setIsMember(true);
					} else {
						fetch("/api/posts/")
							.then((response) => response.json())
							.then((result) => {
								setCircles(result);
								setIsMember(false);
							});
					}
				});
		} else {
			fetch("/api/posts/")
				.then((response) => response.json())
				.then((result) => {
					setCircles(result);
				});
		}
	}, []);

	return (
		<>
			<div className="wrapper min-h-svh">
				{(!userId || !isMember) && (
					<section className="flex flex-col items-center justify-center gap-6 w-[20rem] h-[20rem] rounded-full bg-(--purple-dark) px-4 my-10 mx-auto">
						<h2 className="font-semi-bold text-2xl text-center text-(--orange-main)">
							You aren't in a circle yet. Enter now?
						</h2>
						<Link to="/categories">
							<Button variant="solid" color="neutral">
								Explore the circles
							</Button>
						</Link>
					</section>
				)}
				<h1 className="text-3xl text-center font-black font-kanit py-8">
					WHO'S UP TO WHAT?
				</h1>

				<div className="flex flex-col items-center bg-(--purple-dark) text-(--orange-main) px-4 py-10">
					{feedPost.slice(0, 10).map((p: FeedPost) => {
						const mediaProps: PostMediaProps = {};
						if (p.post_content) {
							if (p.post_content.includes("image")) {
								mediaProps.postImg = p.post_content;
							} else {
								mediaProps.video = p.post_content;
							}
						}
						const shouldBlur = !isLoggedIn || !isMember;

						return (
							<>
								<Post
									key={p.post_id}
									title={p.post_title}
									text={p.post_text}
									tier={p.post_tier}
									avatar={p.circle_avatar}
									{...mediaProps}
									blurred={shouldBlur}
									slug={p.circle_slug}
									circleId={p.post_author}
								/>
							</>
						);
					})}
				</div>
			</div>
		</>
	);
}
