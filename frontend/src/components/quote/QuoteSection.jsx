import { useState } from 'react';
import { Send, CheckCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';
import api from '../../lib/api';
import toast from 'react-hot-toast';
import styles from './QuoteSection.module.css';

const contactCards = [
  { icon: MapPin, title: 'Location', value: 'Melbourne, Victoria, Australia' },
  { icon: Phone, title: 'Phone', value: '1800 PLASTICS' },
  { icon: Mail, title: 'Email', value: 'sales@beneficialplastics.com.au' },
  { icon: Clock, title: 'Business Hours', value: 'Mon - Fri: 8:00 AM - 5:00 PM AEST' },
];

export default function QuoteSection({
  id,
  eyebrow,
  title = 'Request a Quote',
  description = 'Tell us about your needs and our team will respond within one business day.',
  standalone = false,
}) {
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

  return (
    <section id={id} className={`${styles.section}${standalone ? ` ${styles.standalone}` : ''}`}>
      <div className="container">
        <div className={styles.header}>
          {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
          <h2>{done ? 'Quote Request Received' : title}</h2>
          <p>
            {done
              ? 'Thank you. Our team will get back to you within one business day.'
              : description}
          </p>
        </div>

        {done ? (
          <div className={styles.success}>
            <CheckCircle size={52} color="#001B91" />
            <button
              type="button"
              className="btn btn-blue"
              onClick={() => {
                setDone(false);
                setForm({ name: '', email: '', phone: '', company: '', message: '' });
              }}
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <div className={styles.content}>
            <div className={styles.infoColumn}>
              {contactCards.map(({ icon: Icon, title: cardTitle, value }) => (
                <div key={cardTitle} className={styles.infoCard}>
                  <div className={styles.infoIcon}>
                    <Icon size={26} />
                  </div>
                  <div className={styles.infoText}>
                    <h3>{cardTitle}</h3>
                    <p>{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <form className={styles.formCard} onSubmit={handleSubmit}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor={`${id || 'quote'}-name`}>Your name</label>
                  <input
                    id={`${id || 'quote'}-name`}
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor={`${id || 'quote'}-company`}>Company Name</label>
                  <input
                    id={`${id || 'quote'}-company`}
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Your Company Pty Ltd"
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor={`${id || 'quote'}-email`}>Email</label>
                  <input
                    id={`${id || 'quote'}-email`}
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor={`${id || 'quote'}-phone`}>Phone Number</label>
                  <input
                    id={`${id || 'quote'}-phone`}
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="04XX XXX XXX"
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor={`${id || 'quote'}-message`}>Message</label>
                <textarea
                  id={`${id || 'quote'}-message`}
                  required
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={7}
                  placeholder="Tell us what products you're interested in..."
                />
              </div>

              <button type="submit" className={`${styles.submitBtn} btn btn-blue`} disabled={loading}>
                <Send size={16} />
                {loading ? 'Submitting...' : 'Submit Quote Request'}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
