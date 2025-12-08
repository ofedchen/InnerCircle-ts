import { Router, Request, Response } from "express";
import * as db from "../db/index.js";

const router = Router();

interface User {
	users_id: number;
	users_name?: string;
	users_email?: string;
	users_avatar?: string;
	users_payment?: string;
}

interface UpdateUserBody {
	userName?: string;
	userEmail?: string;
	userAvatar?: string;
	userPayment?: string;
}

router.get("/", async (req: Request, res: Response) => {
	try {
		const result = await db.query("SELECT * FROM users");
		res.send(result.rows);
	} catch (err: unknown) {
		console.error("Error fetching all users", err);
		const message = err instanceof Error ? err.message : String(err);
		res.status(500).json({
			error: "Failed to fetch all users",
			message,
		});
	}
});

router.get(
	"/:users_id",
	async (req: Request<{ users_id: string }>, res: Response) => {
		try {
			const result = await db.query("SELECT * FROM users WHERE users_id = $1", [
				req.params.users_id,
			]);
			res.send(result.rows[0]);
		} catch (err: unknown) {
			console.error("Error fetching the user", err);
			const message = err instanceof Error ? err.message : String(err);
			res.status(500).json({
				error: "Failed to fetch the user",
				message,
			});
		}
	}
);

router.patch(
	"/:users_id",
	async (
		req: Request<{ users_id: string }, {}, UpdateUserBody>,
		res: Response
	) => {
		const { userName, userEmail, userAvatar, userPayment } = req.body;

		try {
			const updates = [];
			const values = [];
			let paramIndex = 1;

			if (userName !== undefined) {
				updates.push(`users_name = $${paramIndex}`);
				values.push(userName);
				paramIndex++;
			}
			if (userEmail !== undefined) {
				updates.push(`users_email = $${paramIndex}`);
				values.push(userEmail);
				paramIndex++;
			}
			if (userAvatar !== undefined) {
				updates.push(`users_avatar = $${paramIndex}`);
				values.push(userAvatar);
				paramIndex++;
			}
			if (userPayment !== undefined) {
				updates.push(`users_payment = $${paramIndex}`);
				values.push(userPayment);
				paramIndex++;
			}

			if (updates.length === 0) {
				return res
					.status(400)
					.json({ error: "No valid field provided for update" });
			}

			values.push(req.params.users_id);

			const query = `UPDATE users SET ${updates.join(
				", "
			)} WHERE users_id = $${paramIndex} RETURNING *`;

			const result = await db.query(query, values);
			res.status(200).json(result.rows[0]);
		} catch (err: unknown) {
			console.error("Error updating the user", err);
			const message = err instanceof Error ? err.message : String(err);
			res.status(500).json({
				error: "Failed to update the user",
				message,
			});
		}
	}
);

router.delete(
	"/:users_id",
	async (req: Request<{ users_id: string }>, res: Response) => {
		try {
			const result = await db.query("DELETE FROM users WHERE users_id = $1", [
				req.params.users_id,
			]);
			res.status(200).json({ message: "User deleted!" });
		} catch (err: unknown) {
			console.error("Error deleting the user: ", err);
			const message = err instanceof Error ? err.message : String(err);
			res.status(500).json({
				error: "Failed to delete the user",
				message,
			});
		}
	}
);
export default router;
