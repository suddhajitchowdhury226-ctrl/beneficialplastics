import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import styles from './BSPFittings.module.css'; // reuse identical grid/card CSS

import imgBottle   from '../assets/BOTTLE DRAINING TREE.png';
import imgPourers  from '../assets/POURERS.png';
import imgPushBtn  from '../assets/PUSH BUTTON TAP.png';
import imgSnapBSP  from '../assets/SNAP TAP – 3 4″ BSP.png';
import imgSnapBox  from '../assets/SNAP TAP – BOX of 25, 3  4″ BSP.png';
import imgSnapFem  from '../assets/SNAP TAP – FEMALE Thread 3   8″ BSP.png';
import imgSnap44   from '../assets/SNAP TAP – 44mm LONG THREAD.png';
import imgSnapStd  from '../assets/SNAP TAP – STANDARD Thread 3 4″ UNF.png';

const products = [
  { slug: 'bottle-draining-tree',        name: 'Bottle Draining Tree',                      price: '31.79', img: imgBottle  },
  { slug: 'pourers',                     name: 'Pourers',                                    price: '7.30',  img: imgPourers },
  { slug: 'push-button-tap',             name: 'Push Button Tap',                            price: '6.50',  img: imgPushBtn },
  { slug: 'snap-tap-34-bsp',             name: 'Snap Tap – 3/4″ BSP',                        price: '6.50',  img: imgSnapBSP },
  { slug: 'snap-tap-34-bsp-copy',        name: 'Snap Tap – 3/4″ BSP (Copy)',                 price: '6.50',  img: imgSnapBSP },
  { slug: 'snap-tap-box-25-34-bsp',      name: 'Snap Tap – Box of 25, 3/4″ BSP',             price: '85.25', img: imgSnapBox },
  { slug: 'snap-tap-female-38-bsp',      name: 'Snap Tap – Female Thread 3/8″ BSP',          price: '6.50',  img: imgSnapFem },
  { slug: 'snap-tap-44mm-long-thread',   name: 'Snap Tap – 44mm Long Thread',               price: '6.50',  img: imgSnap44  },
  { slug: 'snap-tap-standard-34-unf',    name: 'Snap Tap – Standard Thread 3/4″ UNF',       price: '6.50',  img: imgSnapStd },
];

export default function HomeBrewProducts() {
  return (
    <div className={styles.page}>
      <div className="container">

        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Home Brew Products</span>
        </nav>

        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.pageTitle}>Home Brew Products</h1>
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
                <Link to={`/products/home-brew/${p.slug}`} className={styles.name}>
                  {p.name}
                </Link>
                <div className={styles.priceRow}>
                  <span className={styles.price}>${p.price}</span>
                  <button className={styles.wishlistInline} aria-label="Wishlist">
                    <Heart size={13} />
                  </button>
                </div>
                <Link to={`/products/home-brew/${p.slug}`} className={styles.viewBtn}>
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
