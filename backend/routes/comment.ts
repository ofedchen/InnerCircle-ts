import { Router, Request, Response } from "express";
import * as db from "../db/index.js";
import type { Comment } from "../../frontend/src/types.js";

const router = Router();

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

export default router;
