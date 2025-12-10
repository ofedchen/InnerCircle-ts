import { Avatar } from "@mui/joy";

type CommentProps = {
  author: string;
  date: Date;
  commentText: string;
};

export default function Comment({ date, author, commentText }: CommentProps) {
  const initial = author.charAt(0).toUpperCase();

  return (
    <>
      <div className="comment-wrapper px-4 py-2 grid grid-cols-[1fr_3fr_6fr] items-center gap-2 border border-gray-500 rounded-lg m-4">
        <Avatar data-cy="comment-avatar">{initial}</Avatar>
        <h3 className="font-semibold" data-cy="comment-author">{author}</h3>
        <h4 className="text-gray-600" data-cy="comment-date">
          Date:{" "}
          <span className="text-sm">
            {date?.toLocaleString("fr-FR", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </span>
        </h4>
        <p className="col-span-3 py-2" data-cy="comment-text">{commentText}</p>
      </div>
    </>
  );
}
