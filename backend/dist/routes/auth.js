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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argon2_1 = __importDefault(require("argon2"));
const express_1 = require("express");
const db = __importStar(require("../db/index"));
const router = (0, express_1.Router)();
async function hashPassword(password) {
    try {
        const hash = await argon2_1.default.hash(password);
        return hash;
    }
    catch (err) {
        console.error("Error hashing password:", err);
    }
}
async function checkPassword(hashedPassword, password) {
    try {
        const match = await argon2_1.default.verify(hashedPassword, password);
        return match;
    }
    catch (err) {
        console.error("Error verifying password:", err);
        return false;
    }
}
router.post("/signup", async (req, res) => {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
        return res.status(400).json({ error: "Please fill in the missing info" });
    }
    try {
        const existingUser = await db.query("SELECT users_id FROM users WHERE users_email = $1", [email]);
        if (existingUser.rows.length > 0) {
            return res.status(409).json({ error: "Email already exists" });
        }
        const hashedPassword = await hashPassword(password);
        const result = await db.query("INSERT INTO users (users_name, users_email, users_pass, users_payment) VALUES($1, $2, $3, $4) RETURNING users_id, users_name, users_email", [userName, email, hashedPassword, "VISA"]);
        res.status(201).json({
            message: "User created successfully",
            user: result.rows[0],
        });
    }
    catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ error: "Failed to create user" });
    }
});
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }
    try {
        const result = await db.query("SELECT users_id, users_name, users_email, users_avatar, users_pass FROM users WHERE users_email = $1", [email]);
        if (result.rows.length === 0) {
            return res
                .status(401)
                .json({ error: "Invalid email, please try again" });
        }
        const user = result.rows[0];
        const isPasswordValid = await checkPassword(user.users_pass, password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }
        // user data w/o password
        const { users_pass, ...userWithoutPassword } = user;
        res.json({
            message: "Login successful",
            user: userWithoutPassword,
        });
    }
    catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Login failed" });
    }
});
exports.default = router;
