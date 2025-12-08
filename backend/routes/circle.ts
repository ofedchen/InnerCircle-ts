import { Router, Request, Response } from "express";
import * as db from "../db/index.js";

const router = Router();

interface CircleParams {
  circle_id: string;
}

//only circle details
router.get("/:circle_id", async (req: Request<CircleParams>, res: Response) => {
  try {
    const result = await db.query(
      "SELECT circle_id, circle_name, circle_avatar, circle_bio, circle_members FROM circle WHERE circle_id = $1",
      [req.params.circle_id]
    );
    res.send(result.rows);
  } catch (err) {
    console.error("Error fetching circle details", err);
    res.status(500).json({
      error: "Failed to fetch circle details",
      message: (err as Error).message,
    });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await db.query(
      "SELECT circle_id, circle_name, circle_avatar, circle_bio, circle_members FROM circle "
    );
    res.send(result.rows);
  } catch (err) {
    console.error("Error fetching circle details", err);
    res.status(500).json({
      error: "Failed to fetch circle details",
      message: (err as Error).message,
    });
  }
});

//list of fans
router.get("/:circle_id/fans", async (req: Request<CircleParams>, res: Response) => {
  try {
    const result = await db.query(
      "SELECT uc_id, uc_circle_tier, uc_user_id FROM userCircle WHERE uc_circle_id = $1",
      [req.params.circle_id]
    );
    res.send(result.rows);
  } catch (err) {
    console.error("Error fetching circle details", err);
    res.status(500).json({
      error: "Failed to fetch circle details",
      message: (err as Error).message,
    });
  }
});

export default router;
