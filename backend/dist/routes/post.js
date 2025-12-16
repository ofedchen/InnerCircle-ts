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
    }
    catch (err) {
        console.error("Error fetching all posts", err);
        res.status(500).json({
            error: "Failed to fetch all posts",
            message: err.message,
        });
    }
});
router.get("/:post_id", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM post WHERE post_id = $1", [
            req.params.post_id,
        ]);
        res.send(result.rows[0]);
    }
    catch (err) {
        console.error("Error fetching the post", err);
        res.status(500).json({
            error: "Failed to fetch the post",
            message: err.message,
        });
    }
});
router.get("/recent-posts/:circle_id", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM post WHERE post_author = $1 ORDER BY post_date DESC LIMIT 2", [req.params.circle_id]);
        res.send(result.rows);
    }
    catch (err) {
        console.error("Error fetching posts", err);
        res.status(500).json({
            error: "Failed to fetch recent posts",
            message: err.message,
        });
    }
});
router.get("/all/:circle_id", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM post WHERE post_author = $1 ORDER BY post_date DESC", [req.params.circle_id]);
        res.send(result.rows);
    }
    catch (err) {
        console.error("Error fetching circle posts", err);
        res.status(500).json({
            error: "Failed to fetch circle posts",
            message: err.message,
        });
    }
});
exports.default = router;
