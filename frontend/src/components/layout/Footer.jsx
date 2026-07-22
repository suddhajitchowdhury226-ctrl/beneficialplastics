import { Mail, Globe, Camera, Briefcase } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.newsletter}>
        <div className="container">
          <div className={styles.newsletterInner}>
            <div className={styles.newsletterLeft}>
              <Mail size={16} />
              <div>
                <strong>Stay Updated</strong>
                <p>Subscribe to get special offers, new product alerts and more.</p>
              </div>
            </div>
            <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
              <input className={styles.newsletterInput} type="email" placeholder="Enter your email address" />
              <button type="submit" className={styles.subBtn}>Subscribe</button>
            </form>
          </div>
        </div>
      </div>
      <div className="container">
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Beneficial Plastics. All rights reserved.</p>
          <div className={styles.socials}>
            <a href="#" className={styles.socialLink} aria-label="Facebook"><Globe size={15} /></a>
            <a href="#" className={styles.socialLink} aria-label="Instagram"><Camera size={15} /></a>
            <a href="#" className={styles.socialLink} aria-label="LinkedIn"><Briefcase size={15} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
