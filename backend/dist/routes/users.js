"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db = __importStar(require("../db/index.js"));
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM users");
        res.send(result.rows);
    }
    catch (err) {
        console.error("Error fetching all users", err);
        const message = err instanceof Error ? err.message : String(err);
        res.status(500).json({
            error: "Failed to fetch all users",
            message,
        });
    }
});
router.get("/:users_id", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM users WHERE users_id = $1", [
            req.params.users_id,
        ]);
        res.send(result.rows[0]);
    }
    catch (err) {
        console.error("Error fetching the user", err);
        const message = err instanceof Error ? err.message : String(err);
        res.status(500).json({
            error: "Failed to fetch the user",
            message,
        });
    }
});
router.patch("/:users_id", async (req, res) => {
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
        const query = `UPDATE users SET ${updates.join(", ")} WHERE users_id = $${paramIndex} RETURNING *`;
        const result = await db.query(query, values);
        res.status(200).json(result.rows[0]);
    }
    catch (err) {
        console.error("Error updating the user", err);
        const message = err instanceof Error ? err.message : String(err);
        res.status(500).json({
            error: "Failed to update the user",
            message,
        });
    }
});
router.delete("/:users_id", async (req, res) => {
    try {
        const result = await db.query("DELETE FROM users WHERE users_id = $1", [
            req.params.users_id,
        ]);
        res.status(200).json({ message: "User deleted!" });
    }
    catch (err) {
        console.error("Error deleting the user: ", err);
        const message = err instanceof Error ? err.message : String(err);
        res.status(500).json({
            error: "Failed to delete the user",
            message,
        });
    }
});
exports.default = router;
