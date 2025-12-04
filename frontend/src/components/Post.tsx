import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import type { Tier } from "../types";

type PostProps = {
	slug: string;
	circleId: number;
	title?: string;
	video?: string;
	postimg?: string;
	text: string;
	tier: Tier;
	imgsrc?: string;
	blurred?: string;
};

export default function Post({
	slug,
	circleId,
	title,
	video,
	postimg,
	text,
	tier,
	imgsrc,
	blurred,
}: PostProps) {
	let textWrap = "";
	if (!video && !postimg) {
		textWrap = "mt-8";
	}

	let lockedPost: string;
	if (blurred) {
		lockedPost = "blur-sm";
	}

	return (
		<div
			id="post-wrapper"
			className="flex flex-col w-full m-4 bg-(--purple-light) p-2 rounded-lg shadow-md"
		>
			<Link
				to={`/circle/${circleId}/${slug}`}
				className="self-start ml-[-14px] mt-[-14px] relative z-50"
			>
				<Avatar
					name={""}
					tierColor={tier}
					src={imgsrc}
					// className="self-start ml-[-14px] mt-[-14px] relative z-50"
				/>
			</Link>

			<div
				id="post-content"
				className={`bg-(--orange-lighter)  rounded-md mt-[-60px] relative z-10 ${lockedPost}`}
			>
				{video ? (
					<iframe
						className="w-full aspect-video rounded-t-md"
						src={`https://www.youtube.com/embed/${video}`}
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerPolicy="strict-origin-when-cross-origin"
						allowFullScreen
					></iframe>
				) : (
					<img src={postimg} />
				)}
			</div>
			<h3
				className={`text-(--orange-main) text-semibold text-xl pt-4 pb-2 ${textWrap} ${lockedPost}`}
			>
				{title}
			</h3>
			<p className={`text-(--orange-white) py-2 ${lockedPost}`}>{text}</p>
			{!blurred && (
				<button className="self-end mr-[-12px]  bg-(--purple-darker) text-(--orange-main) rounded-md px-4 py-2  hover:bg-(--purple-darker)">
					{" "}
					TO POST{" "}
				</button>
			)}
		</div>
	);
}
