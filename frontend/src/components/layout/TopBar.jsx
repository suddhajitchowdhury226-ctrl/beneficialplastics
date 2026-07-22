import { Flag, Truck, ShieldCheck, Info, Phone, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './TopBar.module.css';

export default function TopBar() {
  return (
    <div className={styles.topbar}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.left}>
            <span><Flag size={13} /> Australian Made &amp; Owned</span>
            <span><Truck size={13} /> Fast Australia Wide Delivery</span>
            <span><ShieldCheck size={13} /> Quality You Can Trust</span>
          </div>
          <div className={styles.right}>
            <Link to="/about"><Info size={13} /> About Us</Link>
            <Link to="/contact"><Phone size={13} /> Contact Us</Link>
            <Link to="/track-order"><Package size={13} /> Track Order</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
