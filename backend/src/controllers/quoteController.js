import Quote from '../models/Quote.js';

export const createQuote = async (req, res) => {
  try {
    const quote = await Quote.create(req.body);
    res.status(201).json({ success: true, data: quote, message: 'Quote request submitted successfully' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getQuotes = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const filter = status ? { status } : {};
    const [quotes, total] = await Promise.all([
      Quote.find(filter).sort('-createdAt').skip((page - 1) * limit).limit(Number(limit)),
      Quote.countDocuments(filter),
    ]);
    res.json({ success: true, data: quotes, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateQuoteStatus = async (req, res) => {
  try {
    const quote = await Quote.findByIdAndUpdate(req.params.id, { status: req.body.status, adminNotes: req.body.adminNotes }, { new: true });
    if (!quote) return res.status(404).json({ success: false, message: 'Quote not found' });
    res.json({ success: true, data: quote });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
