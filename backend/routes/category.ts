import { Router, Request, Response } from 'express';
import * as db from '../db/index.js';

const router = Router();

interface CategoryParams {
  category_name: string;
}

router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await db.query('SELECT * FROM category')
    res.send(result.rows)
  } catch (err) {
    console.error('Error fetching categories', err)
    res.status(500).json({
      error: 'Failed to fetch categories',
      message: (err as Error).message
    })
  }
})

router.get('/:category_name', async (req: Request<CategoryParams>, res: Response) => {
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
    const result = await db.query(query, [req.params.category_name])
    res.send(result.rows)
  } catch (err) {
    console.error('Error fetching category circles', err)
    res.status(500).json({
      error: 'Failed to fetch category circles',
      message: (err as Error).message
    })
  }
})

export default router;