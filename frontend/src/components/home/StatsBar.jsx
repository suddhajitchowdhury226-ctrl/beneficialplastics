import { CheckCircle } from 'lucide-react';
import styles from './StatsBar.module.css';

const STATS = [
  { number: '20+', label: 'Years Experience', check: false },
  { number: '1000+', label: 'Happy Customers', check: false },
  { number: '500+', label: 'Quality Products', check: false },
  { number: 'Australia Wide', label: 'Fast Delivery', check: true },
];

export default function StatsBar() {
  return (
    <div className={styles.bar}>
      <div className="container">
        <div className={styles.grid}>
          {STATS.map(({ number, label, check }) => (
            <div key={label} className={styles.item}>
              <div className={styles.number}>
                {check && <CheckCircle size={22} className={styles.checkIcon} />}
                {number}
              </div>
              <div className={styles.label}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
