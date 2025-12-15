import { Router, Request, Response } from "express";
import * as db from "../db/index.js";
import fs from "fs";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "node:url";
import { customAlphabet } from "nanoid";

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.resolve(__dirname, "../../frontend/public/images/users");
const nanoid = customAlphabet("0123456789", 4);

const storage = multer.diskStorage({
	destination: (req: Request, _file: Express.Multer.File, cb) => {
		cb(null, uploadDir);
	},
	filename: (_req: Request, file: Express.Multer.File, cb) => {
		const id = Number(nanoid());
		const timestamp = Date.now();
		const ext = path.extname(file.originalname) || "";
		const base = path.basename(file.originalname, ext).replace(/\s+/g, "_");
		const safe = `${id}-${timestamp}-${base}${ext}`;
		cb(null, safe);
	},
});
const upload = multer({ storage });

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

router.post(
	"/:users_id/avatar",
	upload.single("avatar"),
	async (req: Request<{ users_id: string }>, res: Response) => {
		try {
			if (!req.file) {
				console.log("Avatar uploaded without file in request");
				return res.status(400).json({ error: "No file uploaded" });
			}

			const file = req.file;
			const userId = req.params.users_id;

			console.log("Avatar upload: multer saved file at: ", file.path);
			console.log("Configured the uploadDir:  ", uploadDir);

			const userResult = await db.query(
				"SELECT users_name FROM users WHERE users_id = $1",
				[userId]
			);

			if (userResult.rows.length === 0) {
				if (fs.existsSync(file.path)) {
					fs.unlinkSync(file.path);
				}
				return res.status(404).json({ error: "User not found" });
			}

			const userName = userResult.rows[0].users_name || `user-${userId}`;
			const safeUserName = String(userName).replace(/[^a-z0-9_\-]/gi, "_");
			const newFilename = `${safeUserName}.webp`;
			const newPath = path.join(uploadDir, newFilename);

			try {
				fs.renameSync(file.path, newPath);
				const avatarPath = `images/users/${newFilename}`;
				const result = await db.query(
					"UPDATE users SET users_avatar = $1 WHERE users_id = $2 RETURNING *",
					[avatarPath, userId]
				);
				console.log("Avatar saved for user", userId, "->", avatarPath);
				res.status(200).json({
					message: "Avatar uploaded successfully",
					user: result.rows[0],
					avatarPath,
				});
			} catch (renameErr) {
				console.error("Error renaming/moving uploaded file:", renameErr);

				if (fs.existsSync(file.path)) {
					try {
						fs.unlinkSync(file.path);
					} catch (e) {
						console.error(
							"Failed to unlink temp upload after rename error:",
							e
						);
					}
				}
				res.status(500).json({ error: "Error processing uploaded file" });
			}
		} catch (err: unknown) {
			console.error("Error uploading avatar:", err);
			const message = err instanceof Error ? err.message : String(err);
			res.status(500).json({
				error: "Failed to upload avatar",
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
