import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Divider } from "@mui/joy";
import type {
  FeedPost,
  CommentType,
  CommentBody,
  UserCircleType,
} from "../types";
import { getMediaProps } from "../utils/utils";
import AuthModal from "../components/AuthModal";
import Avatar from "../components/Avatar";
import Comment from "../components/Comment";
import { useUser } from "../hooks/useUser";

export default function PostRoute() {
  const { postId } = useParams<string>();
  const [postDetails, setPostDetails] = useState<FeedPost | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLockedPost, setIsLockedPost] = useState<boolean>(true);
  const [commentText, setCommentText] = useState<string>("");

  const { userId } = useUser();

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

  useEffect(() => {
    if (userId && postDetails) {
      fetch(`/api/user-circles/${userId}`)
        .then((response) => response.json())
        .then((result: UserCircleType[]) => {
          const membership: UserCircleType = result.find(
            (uc: UserCircleType) => uc.circle_id === postDetails.post_author
          );
          if (membership) {
            const tierHierarchy = { Bronze: 1, Silver: 2, Gold: 3 };
            setIsLockedPost(
              tierHierarchy[membership.uc_circle_tier] <
                tierHierarchy[postDetails.post_tier]
            );
          }
        });
    }
  }, [userId, postDetails]);

  async function postComment() {
    const commentBody: CommentBody = {
      userId: userId,
      commentText: commentText,
      postId: Number(postId),
    };

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentBody),
      });

      const result = await response.json();

      if (!response.ok) {
        return;
      }

      if (result.comment) {
        setComments([...comments, result.comment]);
      }

      setCommentText("");
    } catch (error) {
      console.error("Signup error:", error);
    }
  }

  if (!postDetails) {
    return (
      <div className="wrapper">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  const mediaProps = getMediaProps(postDetails.post_content);

  return (
    <div className="wrapper-dark">
      <article
        data-cy="post"
        className="bg-(--purple-light) flex flex-col items-center px-2 py-2 mx-2 my-4 border border-gray-500 rounded-lg"
      >
        <div className="grid grid-cols-[1fr_2fr] grid-rows-2 items-center gap-x-8 pt-2 pb-2">
          <Link
            to={`/circle/${postDetails.post_author}/${postDetails.circle_slug}`}
            className="row-span-2"
          >
            <Avatar
              src={postDetails.circle_avatar}
              name={postDetails.circle_name}
              variant="small"
              tierColor={postDetails.post_tier}
            />
          </Link>
          <h1 data-cy="post-title" className="text-2xl font-semibold py-2">
            {postDetails.post_title}
          </h1>
          <h3 className="text-gray-200">
            {new Date(postDetails.post_date).toLocaleString("fr-FR", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </h3>
        </div>
        <div
          className={`py-4 px-2 bg-(--purple-white) border border-gray-500 rounded-lg`}
        >
          <div
            data-cy="post-details"
            className={`${isLockedPost ? "blur-sm" : ""}`}
          >
            <p data-cy="post-text" className="pb-4 px-2">
              {postDetails.post_text}
            </p>
            {mediaProps.video ? (
              <iframe
                className="w-full aspect-video rounded-t-md"
                src={`https://www.youtube.com/embed/${mediaProps.video}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            ) : (
              mediaProps.postImg && <img src={mediaProps.postImg} loading="lazy" />
            )}
          </div>
          <section data-cy="comments" className="pt-4">
            <Divider>
              <h3 className="font-semibold text-black text-lg">Comments: </h3>
            </Divider>
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
            {!isLockedPost ? (
              <form
                data-cy="add-comment"
                className="py-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  postComment();
                }}
              >
                <label
                  className="w-full font-semibold py-4"
                  htmlFor="new-comment"
                >
                  Add your comment:
                  <input
                    className="border rounded-lg h-12 w-full bg-(--neutral-light) my-2 font-normal text-md"
                    type="text"
                    id="new-comment"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                </label>
                <Button type="submit">Post comment</Button>
              </form>
            ) : (
              <section className="text-center">
                <p className="py-4">Log in to see the post and comment!</p>
                <AuthModal modalType={"login"} />
              </section>
            )}
          </section>
        </div>
      </article>
    </div>
  );
}
