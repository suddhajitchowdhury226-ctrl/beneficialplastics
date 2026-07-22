import { Router } from 'express';
import { createQuote, getQuotes, updateQuoteStatus } from '../controllers/quoteController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = Router();
router.post('/', createQuote);
router.get('/', protect, adminOnly, getQuotes);
router.put('/:id', protect, adminOnly, updateQuoteStatus);
export default router;
