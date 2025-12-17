import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
	connectionString: process.env.PGURI,
	ssl: {
		rejectUnauthorized: false,
	},
});

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params)
}