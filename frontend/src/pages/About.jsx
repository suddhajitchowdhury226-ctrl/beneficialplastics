import { MapPin, Truck, Award, Users, Leaf } from 'lucide-react';
import styles from './About.module.css';

export default function About() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.hero}>
          <div className={styles.heroBadge}>About Us</div>
          <h1>Australia's Trusted Plastic Products Manufacturer</h1>
          <p>For over 20 years, Beneficial Plastics has been supplying durable, quality plastic products to Australian industries, farms, and households.</p>
        </div>

        <div className={styles.grid}>
          {[
            { icon: MapPin, title: 'Australian Made', desc: 'All our products are manufactured with premium materials in Australia.' },
            { icon: Truck, title: 'Fast Nationwide Delivery', desc: 'We deliver across all of Australia with fast, reliable shipping.' },
            { icon: Award, title: '20+ Years Experience', desc: 'Two decades of industry expertise serving Australian businesses.' },
            { icon: Users, title: '1000+ Happy Customers', desc: 'Trusted by agriculture, manufacturing, and retail industries.' },
            { icon: Leaf, title: 'Eco Conscious', desc: 'We prioritise recyclable materials to reduce environmental impact.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className={styles.card}>
              <div className={styles.icon}><Icon size={22} /></div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
