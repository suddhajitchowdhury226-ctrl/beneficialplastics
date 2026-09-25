import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import styles from './BSPFittings.module.css';

import imgAdaptor        from '../assets/BSP Adaptor.png';
import imgAdaptorWasher  from '../assets/BSP ADAPTOR WASHER SET.png';
import imgBungCap        from '../assets/BSP BUNG CAP.png';
import imgWasher         from '../assets/BSP WASHER.png';
import imgCamlockAdaptor from '../assets/CAMLOCK ADAPTOR.png';
import imgCamlockSet     from '../assets/CAMLOCK ADAPTOR, CAP AND WASHER SET.png';
import imgCamlockBung    from '../assets/CAMLOCK BUNG CAP.png';
import imgCamlockWasher  from '../assets/CAMLOCK WASHER.png';

const products = [
  { slug: 'bsp-adaptor',                      name: 'BSP Adaptor',                           price: '6.30', img: imgAdaptor },
  { slug: 'bsp-adaptor-washer-set',            name: 'BSP Adaptor Washer Set',                price: '6.70', img: imgAdaptorWasher },
  { slug: 'bsp-bung-cap',                      name: 'BSP Bung Cap',                          price: '0.75', img: imgBungCap },
  { slug: 'bsp-washer',                        name: 'BSP Washer',                            price: '0.60', img: imgWasher },
  { slug: 'camlock-adaptor',                   name: 'Camlock Adaptor',                       price: '6.50', img: imgCamlockAdaptor },
  { slug: 'camlock-adaptor-cap-washer-set',    name: 'Camlock Adaptor, Cap and Washer Set',   price: '6.95', img: imgCamlockSet },
  { slug: 'camlock-bung-cap',                  name: 'Camlock Bung Cap',                      price: '0.45', img: imgCamlockBung },
  { slug: 'camlock-washer',                    name: 'Camlock Washer',                        price: '0.60', img: imgCamlockWasher },
];

export default function BSPFittings() {
  return (
    <div className={styles.page}>
      <div className="container">

        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>BSP Fittings</span>
        </nav>

        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.pageTitle}>BSP Fittings</h1>
            <p className={styles.count}>Showing all {products.length} results</p>
          </div>
          <select className={styles.sort} defaultValue="default">
            <option value="default">Default sorting</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {products.map((p) => (
            <div key={p.slug} className={styles.card}>
              <div className={styles.imgWrap}>
                <img src={p.img} alt={p.name} className={styles.img} />
                <button className={styles.wishlist} aria-label="Add to wishlist">
                  <Heart size={15} />
                </button>
              </div>
              <div className={styles.cardBody}>
                <Link to={`/products/bsp-fittings/${p.slug}`} className={styles.name}>
                  {p.name}
                </Link>
                <div className={styles.priceRow}>
                  <span className={styles.price}>${p.price}</span>
                  <button className={styles.wishlistInline} aria-label="Wishlist">
                    <Heart size={13} />
                  </button>
                </div>
                <Link to={`/products/bsp-fittings/${p.slug}`} className={styles.viewBtn}>
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
