import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { FeedPost, CommentType } from "../types";
import { getMediaProps } from "../utils/utils";
import Avatar from "../components/Avatar";
import Comment from "../components/Comment";

export default function PostRoute() {
  const { postId } = useParams<string>();
  const [postDetails, setPostDetails] = useState<FeedPost | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    fetch(`/api/posts/${postId}`)
      .then((response) => response.json())
      .then((result: FeedPost) => {
        setPostDetails(result);
      });

    fetch(`/api/comments/${postId}`)
      .then((response) => response.json())
      .then((result: CommentType[]) => setComments(result));
  }, [postId]);

  if (!postDetails) {
    return (
      <div className="wrapper">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  const mediaProps = getMediaProps(postDetails.post_content);

  return (
    <div className="wrapper">
      <article className="flex flex-col items-center px-4 py-2">
        <div className="grid grid-cols-[1fr_2fr] grid-rows-2 items-center gap-x-8 pt-6 pb-2">
          <Avatar
            className="row-span-2"
            src={postDetails.circle_avatar}
            name={postDetails.circle_name}
            variant="small"
            tierColor={postDetails.post_tier}
          />
          <h1 className="text-2xl font-semibold py-2">
            {postDetails.post_title}
          </h1>
          <h3 className="text-gray-200">
            {new Date(postDetails.post_date).toLocaleString("fr-FR", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </h3>
        </div>
        <div className="py-4 px-2 bg-(--purple-white) border border-gray-500 rounded-lg">
          <p className="pb-4 px-2">{postDetails.post_text}</p>
          {mediaProps.video ? (
            <iframe
              className="w-full aspect-video rounded-t-md"
              src={`https://www.youtube.com/embed/${mediaProps.video}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ) : (
            mediaProps.postImg && <img src={mediaProps.postImg} />
          )}
          <h3 className="font-semibold pt-6">Comments: </h3>
          {comments.length > 0 ? (
            comments.map((comment) => {
              return (
                <Comment
                  key={comment.comment_id}
                  author={comment.users_name}
                  commentText={comment.comment_text}
                  date={new Date(comment.comment_date)}
                />
              );
            })
          ) : (
            <p>No comments yet</p>
          )}
        </div>
      </article>
    </div>
  );
}
