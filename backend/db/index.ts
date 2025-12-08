import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
	connectionString: process.env.PGURI,
});

/* const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '',
  database: 'innercircle',
  ssl: false
}) */

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params)
}