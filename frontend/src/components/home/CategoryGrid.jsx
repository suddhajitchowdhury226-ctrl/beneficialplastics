import { Link } from 'react-router-dom';
import { MapPin, Truck, ShieldCheck, Leaf, Lock, ThumbsUp, Plus, ArrowRight } from 'lucide-react';
import { useCategories } from '../../hooks/useCategories';
import styles from './CategoryGrid.module.css';

const FALLBACK_CATEGORIES = [
  { slug: 'bsp-fittings', name: 'BSP Fittings', productCount: 8, img: 'https://www.beneficialplastics.com.au/wp-content/uploads/2020/03/categori_img2.jpg' },
  { slug: 'containers', name: 'Containers', productCount: 3, img: 'https://www.beneficialplastics.com.au/wp-content/uploads/2020/03/categori_img1.jpg' },
  { slug: 'home-brew-products', name: 'Home Brew Products', productCount: 1, img: 'https://www.beneficialplastics.com.au/wp-content/uploads/2020/03/categori_img3.jpg' },
  { slug: 'taps', name: 'Taps', productCount: 9, img: 'https://www.beneficialplastics.com.au/wp-content/uploads/2020/03/categori_img4.jpg' },
  { slug: 'pourers', name: 'Pourers', productCount: 1, img: 'https://www.beneficialplastics.com.au/wp-content/uploads/2020/03/POURERS-2-1.jpg' },
  { slug: 'special-products', name: 'Special Products', productCount: 9, img: 'https://www.beneficialplastics.com.au/wp-content/uploads/2020/03/categori_img6.jpg' },
];

const TRUST_ITEMS = [
  { icon: MapPin, label: 'Australian Made', sub: 'Manufactured with quality materials' },
  { icon: Truck, label: 'Fast Shipping', sub: 'Australia-wide dispatch' },
  { icon: ShieldCheck, label: 'Reliable Quality', sub: 'Products built for long-term use' },
  { icon: Leaf, label: 'Eco Conscious', sub: 'Recyclable materials where possible' },
  { icon: Lock, label: 'Secure Ordering', sub: 'Safe & secure checkout' },
  { icon: ThumbsUp, label: 'Industry Trusted', sub: 'Serving Australian businesses for years' },
];

export default function CategoryGrid() {
  const { data } = useCategories();
  const categories = data?.data?.length ? data.data : FALLBACK_CATEGORIES;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className="section-title">Shop by Category</h2>
          <Link to="/products" className="section-link">View All Categories <ArrowRight size={15} /></Link>
        </div>

        <div className={styles.grid}>
          {categories.map((cat) => (
            <Link to={`/products?category=${cat.slug}`} key={cat.slug} className={styles.card}>
              <div className={styles.imgWrap}>
                <img src={cat.image?.url || cat.img} alt={cat.name} loading="lazy" />
              </div>
              <div className={styles.name}>{cat.name}</div>
              <div className={styles.count}>{cat.productCount}+ Products</div>
              <div className={styles.plus}><Plus size={12} /></div>
            </Link>
          ))}
        </div>

        <div className={styles.trustBar}>
          {TRUST_ITEMS.map(({ icon: Icon, label, sub }) => (
            <div key={label} className={styles.trustItem}>
              <div className={styles.trustIcon}><Icon size={16} /></div>
              <div className={styles.trustText}>
                <strong>{label}</strong>
                <span>{sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
