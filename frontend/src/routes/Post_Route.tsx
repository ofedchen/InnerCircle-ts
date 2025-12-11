import { useParams } from "react-router-dom";
import { useState } from "react";
import type { PostType } from "../types";

export default function PostRoute() {
  const { postId } = useParams();
  const [post, setPost] = useState<PostType | null>(null);

  return <></>;
}
