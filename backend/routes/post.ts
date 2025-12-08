import { Router, Request, Response } from "express";
import * as db from "../db/index.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
	const query = `
    SELECT
      p.post_id,
      p.post_title,
      p.post_text,
      p.post_content,
      p.post_date,
      p.post_tier,
	  	c.circle_id,
	 		c.circle_slug,
      c.circle_name,
      c.circle_avatar
    FROM post p
    INNER JOIN circle c
    ON p.post_author = c.circle_id
    ORDER BY p.post_date DESC;
  `;

	try {
		const result = await db.query(query);
		res.send(result.rows);
	} catch (err: unknown) {
		console.error("Error fetching all posts", err);
		res.status(500).json({
			error: "Failed to fetch all posts",
			message: (err as Error).message,
		});
	}
});

router.get("/:post_id", async (req: Request, res: Response) => {
	try {
		const result = await db.query("SELECT * FROM post WHERE post_id = $1", [
			req.params.post_id,
		]);
		res.send(result.rows[0]);
	} catch (err: unknown) {
		console.error("Error fetching the post", err);
		res.status(500).json({
			error: "Failed to fetch the post",
			message: (err as Error).message,
		});
	}
});

router.get("/recent-posts/:circle_id", async (req: Request, res: Response) => {
	try {
		const result = await db.query(
			"SELECT * FROM post WHERE post_author = $1 ORDER BY post_date DESC LIMIT 2",
			[req.params.circle_id]
		);
		res.send(result.rows);
	} catch (err: unknown) {
		console.error("Error fetching posts", err);
		res.status(500).json({
			error: "Failed to fetch recent posts",
			message: (err as Error).message,
		});
	}
});

router.get("/all/:circle_id", async (req: Request, res: Response) => {
	try {
		const result = await db.query(
			"SELECT * FROM post WHERE post_author = $1 ORDER BY post_date DESC",
			[req.params.circle_id]
		);
		res.send(result.rows);
	} catch (err: unknown) {
		console.error("Error fetching circle posts", err);
		res.status(500).json({
			error: "Failed to fetch circle posts",
			message: (err as Error).message,
		});
	}
});

export default router;
