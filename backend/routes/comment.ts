import { Router, Request, Response } from "express";
import * as db from "../db/index.js";

const router = Router();

type CreateCommentBody = {
  userId: string;
  commentText: string;
  postId: number;
};

router.get("/", async (req: Request, res: Response) => {
  const query = `
    SELECT
      c.comment_id, c.comment_author, c.comment_text, c.comment_date, c.post_id, u.users_name 
	FROM comment c 
	JOIN users u 
	ON c.comment_author=u.users_id
    ORDER BY c.post_id ASC;
  `;

  try {
    const result = await db.query(query);
    res.send(result.rows);
  } catch (err: unknown) {
    console.error("Error fetching all comments", err);
    res.status(500).json({
      error: "Failed to fetch all comments",
      message: (err as Error).message,
    });
  }
});

router.get(
  "/:post_id",
  async (req: Request<{ post_id: string }>, res: Response) => {
    try {
      const result = await db.query(
        "SELECT c.comment_id, c.comment_author, c.comment_text, c.comment_date, u.users_name FROM comment c JOIN users u ON c.comment_author=u.users_id WHERE post_id = $1 ORDER BY c.comment_date ASC",
        [req.params.post_id]
      );
      res.send(result.rows);
    } catch (err: unknown) {
      console.error("Error fetching comments for post", err);
      res.status(500).json({
        error: "Failed to fetch comments for post",
        message: (err as Error).message,
      });
    }
  }
);

router.post(
  "/",
  async (req: Request<void, void, CreateCommentBody>, res: Response) => {
    const { userId, commentText, postId } = req.body;

    if (!postId) {
      return res
        .status(400)
        .json({ error: "The comment should be connected to a post." });
    }

    if (!userId) {
      return res
        .status(400)
        .json({ error: "You should be logged in to comment" });
    }

    if (!commentText) {
      return res.status(400).json({ error: "Select the circle to join" });
    }

    try {
      const result = await db.query(
        `INSERT INTO comment (comment_author, comment_text, post_id) 
         VALUES($1, $2, $3) 
         RETURNING comment_id, comment_author, comment_text, comment_date, post_id`,
        [userId, commentText, postId]
      );

      const userResult = await db.query(
        "SELECT users_name FROM users WHERE users_id = $1",
        [userId]
      );

      const comment = {
        ...result.rows[0],
        users_name: userResult.rows[0].users_name,
      };

      res.status(201).json({
        message: "new comment added successfully",
        comment,
      });
    } catch (err: unknown) {
      console.error("Error adding comment: ", err);
      res.status(500).json({ error: "Failed to post a comment" });
    }
  }
);

export default router;
