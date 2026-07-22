import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>Contact Us</h1>
        <div className={styles.grid}>
          <div className={styles.info}>
            {[
              { icon: Phone, label: 'Phone', value: '+61 3 9357 0569' },
              { icon: Mail, label: 'Email', value: 'info@beneficialplastics.com.au' },
              { icon: MapPin, label: 'Address', value: 'Melbourne, Victoria, Australia' },
              { icon: Clock, label: 'Business Hours', value: 'Mon - Fri: 8:00 AM - 5:00 PM AEST' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className={styles.infoItem}>
                <div className={styles.infoIcon}><Icon size={18} /></div>
                <div><strong>{label}</strong><p>{value}</p></div>
              </div>
            ))}
          </div>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.field}><label>Name</label><input placeholder="Your name" /></div>
            <div className={styles.field}><label>Email</label><input type="email" placeholder="your@email.com" /></div>
            <div className={styles.field}><label>Message</label><textarea rows={5} placeholder="How can we help?" /></div>
            <button type="submit" className="btn btn-green">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}
