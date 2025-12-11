import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import type { FeedPost } from "../types";

export default function PostRoute() {
  const { postId } = useParams<string>();
  const [postDetails, setPostDetails] = useState<FeedPost | null>(null);

  useEffect(() => {
    fetch(`/api/posts/${postId}`)
      .then((response) => response.json())
      .then((result: FeedPost) => {
        setPostDetails(result);
      });
  }, [postId]);

  return <>{postDetails && <Post />}</>;
}
