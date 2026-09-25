import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import styles from './Containers.module.css';

import img44 from '../assets/44 LITRE INDUSTRIAL BIN & LID.png';
import img54 from '../assets/54 LITRE INDUSTRIAL BIN only.png';
import imgHC from '../assets/Handy Case.png';

const products = [
  {
    slug: '44-litre-bin',
    name: '44 LITRE INDUSTRIAL BIN & LID',
    price: '22.00',
    img: img44,
  },
  {
    slug: '54-litre-bin',
    name: '54 LITRE INDUSTRIAL BIN only',
    price: '18.00',
    img: img54,
  },
  {
    slug: 'handy-case',
    name: 'Handy Case',
    price: '2.85',
    img: imgHC,
  },
];

export default function Containers() {
  return (
    <div className={styles.page}>
      <div className="container">

        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Containers</span>
        </nav>

        {/* Header row */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.pageTitle}>Containers</h1>
            <p className={styles.count}>Showing all {products.length} results</p>
          </div>
          <div className={styles.sortWrap}>
            <select className={styles.sort} defaultValue="default">
              <option value="default">Default sorting</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>

        {/* Product grid */}
        <div className={styles.grid}>
          {products.map((p) => (
            <div key={p.slug} className={styles.card}>
              <div className={styles.imgWrap}>
                <img src={p.img} alt={p.name} className={styles.img} />
                <button className={styles.wishlist} aria-label="Add to wishlist">
                  <Heart size={16} />
                </button>
              </div>
              <div className={styles.cardBody}>
                <Link to={`/products/containers/${p.slug}`} className={styles.name}>
                  {p.name}
                </Link>
                <div className={styles.priceRow}>
                  <span className={styles.price}>${p.price}</span>
                  <button className={styles.wishlistInline} aria-label="Wishlist">
                    <Heart size={14} />
                  </button>
                </div>
                <Link to={`/products/containers/${p.slug}`} className={styles.viewBtn}>
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
