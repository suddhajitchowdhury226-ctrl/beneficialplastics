import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ShoppingCart, Star, ArrowRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import { useFeaturedProducts } from '../../hooks/useProducts';
import styles from './FeaturedProducts.module.css';

const FALLBACK = [
  { _id: '1', slug: 'snap-tap-3-4-bsp', name: 'Snap Tap – 3/4″ BSP', price: 6.50, rating: 4.8, reviewCount: 87, isBestSeller: true, img: 'https://www.beneficialplastics.com.au/wp-content/uploads/2020/04/SNAP-TAP-%E2%80%93-LARGE.jpg' },
  { _id: '2', slug: 'camlock-adaptor-cap-and-washer-set', name: 'Camlock Adaptor, Cap & Washer Set', price: 6.95, rating: 4.9, reviewCount: 57, isBestSeller: true, img: 'https://www.beneficialplastics.com.au/wp-content/uploads/2020/04/CAMLOCK-ADAPTOR-CAP-AND-WASHER-SET-3.jpg' },
  { _id: '3', slug: 'bottle-draining-tree', name: 'Bottle Draining Tree', price: 31.79, rating: 4.9, reviewCount: 63, isBestSeller: true, img: 'https://www.beneficialplastics.com.au/wp-content/uploads/2020/04/BOTTLE-DRAINING-TREE-2-1.jpg' },
  { _id: '4', slug: '44-litre-industrial-bin-and-lid', name: '44 Litre Industrial Bin & Lid', price: 22.00, rating: 4.8, reviewCount: 36, isBestSeller: true, img: 'https://www.beneficialplastics.com.au/wp-content/uploads/2020/04/44-LITRE-BIN.jpg' },
  { _id: '5', slug: 'straight-shaft-heads-clip-tube-with-25-tri-cords', name: 'Straight Shaft Starter Kit', price: 49.95, rating: 4.9, reviewCount: 44, isBestSeller: true, img: 'https://www.beneficialplastics.com.au/wp-content/uploads/2020/04/STRAIGHT-SHAFT-HEADS-1.jpg' },
  { _id: '6', slug: 'bsp-adaptor', name: 'BSP Adaptor', price: 6.30, rating: 4.7, reviewCount: 54, img: 'https://www.beneficialplastics.com.au/wp-content/uploads/2020/04/BSP-ADAPTOR.jpg' },
  { _id: '7', slug: 'push-button-tap', name: 'Push Button Tap', price: 6.50, rating: 4.5, reviewCount: 42, img: 'https://www.beneficialplastics.com.au/wp-content/uploads/2020/04/04-1.jpg' },
  { _id: '8', slug: 'snap-tap-gold-plated', name: 'Snap Tap Gold Plated', price: 16.90, rating: 4.7, reviewCount: 19, img: 'https://www.beneficialplastics.com.au/wp-content/uploads/2020/04/SNAP-TAP-GOLD-PLATED25-1.jpg' },
];

function Stars({ rating }) {
  return (
    <div className="stars">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={12} fill={i < Math.round(rating) ? '#ffc107' : 'none'} color={i < Math.round(rating) ? '#ffc107' : '#ccc'} />
      ))}
    </div>
  );
}

function ProductCard({ product }) {
  const img = product.images?.[0]?.url || product.img;
  return (
    <Link to={`/products/${product.slug}`} className={styles.card}>
      <div className={styles.imgWrap}>
        <img src={img} alt={product.name} loading="lazy" />
        <div className={styles.badges}>
          {product.isBestSeller && <span className="badge badge-green">Best Seller</span>}
          {product.isOnSale && <span className="badge badge-red">Sale</span>}
        </div>
        <button className={styles.cartBtn} onClick={(e) => e.preventDefault()}>
          <ShoppingCart size={14} />
        </button>
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{product.name}</div>
        <div className={styles.ratingRow}>
          <Stars rating={product.rating} />
          <span className={styles.ratingCount}>({product.reviewCount})</span>
        </div>
        <div className={styles.priceRow}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className={styles.originalPrice}>${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

function SkeletonCard() {
  return (
    <div className={`${styles.card} ${styles.skeleton}`}>
      <div className={`skeleton ${styles.skeletonImg}`} />
      <div className={`skeleton ${styles.skeletonLine}`} />
      <div className={`skeleton ${styles.skeletonLine} ${styles.short}`} />
    </div>
  );
}

export default function FeaturedProducts() {
  const { data, isLoading } = useFeaturedProducts();
  const products = data?.data?.length ? data.data : FALLBACK;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className="section-title">Featured Products</h2>
          <Link to="/products" className="section-link">View All Products <ArrowRight size={15} /></Link>
        </div>
        <div className={styles.swiperWrap}>
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={14}
            slidesPerView={5}
            breakpoints={{
              320: { slidesPerView: 1.5 },
              480: { slidesPerView: 2.2 },
              640: { slidesPerView: 3 },
              900: { slidesPerView: 4 },
              1100: { slidesPerView: 5 },
            }}
          >
            {isLoading
              ? Array.from({ length: 5 }, (_, i) => <SwiperSlide key={i}><SkeletonCard /></SwiperSlide>)
              : products.map((p) => <SwiperSlide key={p._id}><ProductCard product={p} /></SwiperSlide>)
            }
          </Swiper>
        </div>
      </div>
    </section>
  );
}
