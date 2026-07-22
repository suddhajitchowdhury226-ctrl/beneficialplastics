import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Truck, Award } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.inner}>

          {/* LEFT — copy */}
          <div>
            <div className={styles.badge}>
              <span />
              Australian Made, Industry Trusted
            </div>
            <h1>
              Australia's Trusted
              <em>Plastic Products</em>
              Manufacturer
            </h1>
            <p className={styles.desc}>
              Durable plastic products engineered for industry, agriculture,
              manufacturing and everyday use. Proudly Australian made
              with fast nationwide delivery.
            </p>
            <div className={styles.ctaRow}>
              <Link to="/products" className={styles.ctaPrimary}>
                Explore Products <ArrowRight size={16} />
              </Link>
              <Link to="/request-quote" className={styles.ctaSecondary}>
                Request Quote
              </Link>
            </div>
            <div className={styles.trustRow}>
              <span className={styles.trustItem}><MapPin size={14} /> Australian Made</span>
              <span className={styles.trustItem}><Truck size={14} /> Fast Shipping</span>
              <span className={styles.trustItem}><Award size={14} /> Premium Quality</span>
            </div>
          </div>

          {/* RIGHT — image */}
          <div className={styles.imageWrap}>
            <div className={styles.imageCircle}>
              <img
                src="/hero-image.png"
                alt="Beneficial Plastics Products"
              />
              <div className={styles.qualityBadge}>
                Quality<br />You Can<br />Trust
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
