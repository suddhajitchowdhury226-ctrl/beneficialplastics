import Product from '../models/Product.js';
import slugify from '../utils/slugify.js';

export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 12, category, featured, search, sort = '-createdAt' } = req.query;
    const filter = { isActive: true };
    if (category) filter.category = category;
    if (featured === 'true') filter.isFeatured = true;
    if (search) filter.$text = { $search: search };

    const [products, total] = await Promise.all([
      Product.find(filter).populate('category', 'name slug').sort(sort).skip((page - 1) * limit).limit(Number(limit)),
      Product.countDocuments(filter),
    ]);
    res.json({ success: true, data: products, total, pages: Math.ceil(total / limit), page: Number(page) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, isActive: true }).populate('category', 'name slug');
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const body = { ...req.body, slug: slugify(req.body.name) };
    if (req.files?.length) body.images = req.files.map(f => ({ url: `/uploads/${f.filename}`, alt: req.body.name }));
    const product = await Product.create(body);
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    if (req.body.name) req.body.slug = slugify(req.body.name);
    if (req.files?.length) req.body.images = req.files.map(f => ({ url: `/uploads/${f.filename}`, alt: req.body.name }));
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
