import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  company: { type: String },
  message: { type: String, required: true },
  products: [{ productId: mongoose.Schema.Types.ObjectId, name: String, quantity: Number }],
  status: { type: String, enum: ['pending', 'reviewed', 'quoted', 'closed'], default: 'pending' },
  adminNotes: { type: String },
}, { timestamps: true });

export default mongoose.model('Quote', quoteSchema);
