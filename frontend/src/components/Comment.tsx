type CommentProps = {
  author: string;
  date: Date;
  commentText: string;
};

export default function Comment({ date, author, commentText }: CommentProps) {
  return (
    <>
      <h3 data-cy="comment-author">{author}</h3>
      <p data-cy="comment-text">{commentText}</p>
      {date && (
        <h4 data-cy="comment-date">
          Date:{" "}
          <span>
            {date?.toLocaleString("fr-FR", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </span>
        </h4>
      )}
    </>
  );
}
