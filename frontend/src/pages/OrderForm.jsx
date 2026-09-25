import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, CheckCircle } from 'lucide-react';
import styles from './OrderForm.module.css';

const ENQUIRY_TYPES = ['Orders', 'General Enquiry', 'Product Information', 'Freight Enquiry', 'Custom Order', 'Other'];

const INITIAL = {
  name: '', telephone: '', email: '',
  facsimile: '', company: '', address: '',
  enquiry: 'Orders', product: '', query: '',
};

export default function OrderForm() {
  const [form,      setForm]      = useState(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [errors,    setErrors]    = useState({});

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())      e.name      = 'Name is required';
    if (!form.telephone.trim()) e.telephone = 'Telephone is required';
    if (!form.email.trim())     e.email     = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.page}>
        <div className="container">
          <div className={styles.success}>
            <CheckCircle size={52} className={styles.successIcon} />
            <h2>Order Enquiry Sent!</h2>
            <p>Thank you, <strong>{form.name}</strong>. We've received your enquiry and will be in touch shortly.</p>
            <div className={styles.successActions}>
              <button className="btn btn-blue" onClick={() => { setForm(INITIAL); setSubmitted(false); }}>
                Submit Another Enquiry
              </button>
              <Link to="/" className="btn btn-outline-blue">Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">

        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Order Form</span>
        </nav>

        {/* Page title */}
        <h1 className={styles.pageTitle}>ORDER FORM</h1>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>

          {/* Row 1 — Name / Telephone / Email */}
          <div className={styles.row3}>
            <div className={styles.field}>
              <label className={styles.label}>
                Your Name <span className={styles.req}>*</span>
              </label>
              <input
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={set('name')}
              />
              {errors.name && <span className={styles.error}>{errors.name}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                Your Telephone <span className={styles.req}>*</span>
              </label>
              <input
                className={`${styles.input} ${errors.telephone ? styles.inputError : ''}`}
                type="tel"
                placeholder="Telephone"
                value={form.telephone}
                onChange={set('telephone')}
              />
              {errors.telephone && <span className={styles.error}>{errors.telephone}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                Your Email <span className={styles.req}>*</span>
              </label>
              <input
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={set('email')}
              />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>
          </div>

          {/* Row 2 — Facsimile / Company / Address */}
          <div className={styles.row3}>
            <div className={styles.field}>
              <label className={styles.label}>Facsimile</label>
              <input
                className={styles.input}
                type="text"
                placeholder="Facsimile"
                value={form.facsimile}
                onChange={set('facsimile')}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Company</label>
              <input
                className={styles.input}
                type="text"
                placeholder="Company"
                value={form.company}
                onChange={set('company')}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Address</label>
              <input
                className={styles.input}
                type="text"
                placeholder="Address"
                value={form.address}
                onChange={set('address')}
              />
            </div>
          </div>

          {/* Row 3 — Enquiry / Product */}
          <div className={styles.row2}>
            <div className={styles.field}>
              <label className={styles.label}>Enquiry</label>
              <select
                className={styles.select}
                value={form.enquiry}
                onChange={set('enquiry')}
              >
                {ENQUIRY_TYPES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Product</label>
              <input
                className={styles.input}
                type="text"
                placeholder="Product"
                value={form.product}
                onChange={set('product')}
              />
            </div>
          </div>

          {/* Row 4 — Query (full width) */}
          <div className={styles.field}>
            <label className={styles.label}>Query</label>
            <textarea
              className={styles.textarea}
              placeholder="Query"
              rows={7}
              value={form.query}
              onChange={set('query')}
            />
          </div>

          {/* Submit */}
          <div className={styles.submitRow}>
            <button type="submit" className={styles.sendBtn}>
              <Send size={15} /> Send
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
