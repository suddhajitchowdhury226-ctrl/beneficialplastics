import { Router } from 'express';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();
router.get('/', getProducts);
router.get('/:slug', getProduct);
router.post('/', protect, adminOnly, upload.array('images', 8), createProduct);
router.put('/:id', protect, adminOnly, upload.array('images', 8), updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);
export default router;
