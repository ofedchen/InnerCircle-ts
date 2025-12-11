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
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM category');
        res.send(result.rows);
    }
    catch (err) {
        console.error('Error fetching categories', err);
        res.status(500).json({
            error: 'Failed to fetch categories',
            message: err.message
        });
    }
});
router.get('/:category_name', async (req, res) => {
    const query = `
   SELECT 
   cat.category_name, 
   c.circle_id, 
   c.circle_slug,
   c.circle_name, 
   c.circle_avatar 
   FROM category cat 
   LEFT JOIN circle c 
   ON c.circle_category = cat.category_id 
   WHERE cat.category_name = $1
  `;
    try {
        const result = await db.query(query, [req.params.category_name]);
        res.send(result.rows);
    }
    catch (err) {
        console.error('Error fetching category circles', err);
        res.status(500).json({
            error: 'Failed to fetch category circles',
            message: err.message
        });
    }
});
exports.default = router;
