import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import api from '../lib/api';
import toast from 'react-hot-toast';
import styles from './RequestQuote.module.css';

export default function RequestQuote() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/quotes', form);
      setDone(true);
      toast.success('Quote request submitted!');
    } catch (err) {
      toast.error(err.message || 'Failed to submit. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (done) return (
    <div className={styles.success}>
      <CheckCircle size={48} color="#1e7e34" />
      <h2>Quote Request Received</h2>
      <p>Thank you! We'll be in touch within 1 business day.</p>
      <button className="btn btn-green" onClick={() => setDone(false)}>Submit Another</button>
    </div>
  );

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.wrap}>
          <div className={styles.header}>
            <h1>Request a Quote</h1>
            <p>Fill in your details and we'll get back to you with a tailored quote.</p>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label>Full Name *</label>
                <input required name="name" value={form.name} onChange={handleChange} placeholder="John Smith" />
              </div>
              <div className={styles.field}>
                <label>Email Address *</label>
                <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@company.com.au" />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label>Phone Number</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="+61 3 XXXX XXXX" />
              </div>
              <div className={styles.field}>
                <label>Company Name</label>
                <input name="company" value={form.company} onChange={handleChange} placeholder="Your Company Pty Ltd" />
              </div>
            </div>
            <div className={styles.field}>
              <label>Message / Product Requirements *</label>
              <textarea required name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Please describe the products you need, quantities, and any special requirements..." />
            </div>
            <button type="submit" className="btn btn-green" disabled={loading}>
              <Send size={15} /> {loading ? 'Submitting...' : 'Submit Quote Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
