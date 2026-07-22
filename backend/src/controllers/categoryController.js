import Category from '../models/Category.js';
import slugify from '../utils/slugify.js';

export const getCategories = async (req, res) => {
  try {
    const cats = await Category.find({ isActive: true }).sort('order');
    res.json({ success: true, data: cats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const body = { ...req.body, slug: slugify(req.body.name) };
    if (req.file) body.image = { url: `/uploads/${req.file.filename}`, alt: req.body.name };
    const cat = await Category.create(body);
    res.status(201).json({ success: true, data: cat });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    if (req.body.name) req.body.slug = slugify(req.body.name);
    if (req.file) req.body.image = { url: `/uploads/${req.file.filename}`, alt: req.body.name };
    const cat = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!cat) return res.status(404).json({ success: false, message: 'Category not found' });
    res.json({ success: true, data: cat });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true, message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
