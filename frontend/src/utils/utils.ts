import type { PostMediaProps } from "../types";

export function getMediaProps(postContent: string | null): PostMediaProps {
  const mediaProps: PostMediaProps = {};
  if (postContent) {
    if (postContent.includes("image")) {
      mediaProps.postImg = postContent;
    } else mediaProps.video = postContent;
  }
  return mediaProps;
}
