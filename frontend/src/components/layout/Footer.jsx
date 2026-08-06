import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import styles from './Footer.module.css';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'About Us', path: '/about' },
  { label: 'Request a Quote', path: '/request-quote' },
  { label: 'Contact Us', path: '/contact' },
];

const productLinks = [
  { label: 'BSP Fittings', path: '/products?category=bsp-fittings' },
  { label: 'Containers', path: '/products?category=containers' },
  { label: 'Home Brew Products', path: '/products?category=home-brew-products' },
  { label: 'Pourers', path: '/products?category=pourers' },
  { label: 'Taps', path: '/products?category=taps' },
  { label: 'Special Products', path: '/products?category=special-products' },
];

const contactItems = [
  { icon: MapPin, label: 'Melbourne, Victoria' },
  { icon: Phone, label: '1800 PLASTICS' },
  { icon: Mail, label: 'sales@beneficialplastics.com.au' },
  { icon: Clock, label: 'Mon - Fri: 8AM - 5PM AEST' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.main}>
          <div className={styles.brandCol}>
            <Link to="/" className={styles.brand}>
              <img src="/footer-top-logo.png" alt="Beneficial Plastics" className={styles.brandImg} />
            </Link>
            <p className={styles.brandText}>
              Serving Australian businesses for years. Durable plastic products engineered
              for industry, agriculture, manufacturing and everyday use.
            </p>
            <ul className={styles.contactList}>
              {contactItems.map(({ icon: Icon, label }) => (
                <li key={label} className={styles.contactItem}>
                  <span className={styles.contactIcon}>
                    <Icon size={15} />
                  </span>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.linkCol}>
            <h4>Quick Links</h4>
            <ul className={styles.linkList}>
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.linkCol}>
            <h4>Our Products</h4>
            <ul className={styles.linkList}>
              {productLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.newsletterCol}>
            <h4>Stay Updated</h4>
            <p className={styles.newsletterText}>
              Subscribe to get special offers, new product alerts and more.
            </p>
            <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
              <input
                className={styles.newsletterInput}
                type="email"
                placeholder="Enter your email address"
                aria-label="Email address"
              />
              <button type="submit" className={styles.subBtn}>Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className="container">
          <div className={styles.bottom}>
            <p>&copy; {new Date().getFullYear()} Beneficial Plastics. All Rights Reserved.</p>
            <div className={styles.legalLinks}>
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
