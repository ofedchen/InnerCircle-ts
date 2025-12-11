import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import type { Tier } from "../types";

type PostProps = {
  slug: string;
  circleId: number;
  title: string;
  text: string;
  tier: Tier;
  postId: number;
  blurred?: boolean;
  video?: string;
  postImg?: string;
  avatar?: string;
};

export default function Post({
  slug,
  circleId,
  title,
  text,
  tier,
  postId,
  video,
  postImg,
  avatar,
  blurred,
}: PostProps) {
  let textWrap = "";
  if (!video && !postImg) {
    textWrap = "mt-8";
  }

  let lockedPost: string;
  if (blurred === true) {
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
          tierColor={blurred ? null : tier}
          src={avatar}
          variant="small"
          className="self-start ml-[-2px] mt-[-6px] relative z-50"
          slug={slug}
        />
      </Link>

      <div
        id="post-content"
        className={`rounded-md mt-[-60px] relative z-10 ${lockedPost}`}
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
          <img src={postImg} />
        )}
      </div>
      <Link to={`/feed/${postId}`}>
        <h3
          className={`text-(--orange-main) text-semibold text-xl pt-4 pb-2 ${textWrap} ${lockedPost}`}
        >
          {title}
        </h3>
      </Link>
      <p className={`text-(--orange-white) py-2 ${lockedPost}`}>{text}</p>
      {!blurred && (
        <Link to={`/feed/${postId}`}>
          <button className="self-end mr-[-12px]  bg-(--purple-darker) text-(--orange-main) rounded-md px-4 py-2  hover:bg-(--purple-darker)">
            {" "}
            TO POST{" "}
          </button>
        </Link>
      )}
    </div>
  );
}
