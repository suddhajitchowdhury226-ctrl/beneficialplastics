import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Share2, ChevronRight, Minus, Plus } from 'lucide-react';
import { useProduct } from '../hooks/useProducts';
import toast from 'react-hot-toast';
import styles from './ProductDetail.module.css';

export default function ProductDetail() {
  const { slug } = useParams();
  const { data, isLoading } = useProduct(slug);
  const [qty, setQty] = useState(1);
  const product = data?.data;

  if (isLoading) return <div className={styles.loading}><div className="skeleton" style={{ height: 400 }} /></div>;
  if (!product) return <div className={styles.notFound}>Product not found.</div>;

  const img = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80';

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.breadcrumb}>
          <Link to="/">Home</Link>
          <ChevronRight size={13} />
          <Link to="/products">Products</Link>
          <ChevronRight size={13} />
          <span>{product.name}</span>
        </div>

        <div className={styles.grid}>
          <div className={styles.imageSection}>
            <div className={styles.mainImg}>
              <img src={img} alt={product.name} />
            </div>
          </div>

          <div className={styles.details}>
            {product.category && <Link to={`/products?category=${product.category.slug}`} className={styles.catBadge}>{product.category.name}</Link>}
            <h1 className={styles.title}>{product.name}</h1>
            {product.sku && <div className={styles.sku}>SKU: {product.sku}</div>}

            <div className={styles.ratingRow}>
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={15} fill={i < Math.round(product.rating) ? '#ffc107' : 'none'} color={i < Math.round(product.rating) ? '#ffc107' : '#ccc'} />
              ))}
              <span className={styles.ratingCount}>{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            <div className={styles.priceBlock}>
              <span className={styles.price}>${product.price.toFixed(2)}</span>
              {product.originalPrice && <span className={styles.oldPrice}>${product.originalPrice.toFixed(2)}</span>}
              {product.isOnSale && <span className="badge badge-red">Sale</span>}
            </div>

            <p className={styles.desc}>{product.description}</p>

            <div className={styles.qtyRow}>
              <div className={styles.qtyCtrl}>
                <button onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={14} /></button>
                <span>{qty}</span>
                <button onClick={() => setQty(qty + 1)}><Plus size={14} /></button>
              </div>
              <button className="btn btn-green" onClick={() => toast.success('Added to cart')}>
                <ShoppingCart size={15} /> Add to Cart
              </button>
              <Link to="/request-quote" className="btn btn-outline-green">Request Quote</Link>
              <button className={styles.shareBtn} onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied'); }}>
                <Share2 size={16} />
              </button>
            </div>

            {product.specifications?.length > 0 && (
              <div className={styles.specs}>
                <h3>Specifications</h3>
                <table>
                  <tbody>
                    {product.specifications.map((s, i) => (
                      <tr key={i}><td>{s.key}</td><td>{s.value}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
