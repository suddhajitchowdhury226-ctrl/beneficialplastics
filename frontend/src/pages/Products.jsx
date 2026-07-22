import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, SlidersHorizontal, Search } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import styles from './Products.module.css';

function ProductCard({ product }) {
  const img = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80';
  return (
    <Link to={`/products/${product.slug}`} className={styles.card}>
      <div className={styles.imgWrap}>
        <img src={img} alt={product.name} loading="lazy" />
        {product.isBestSeller && <span className="badge badge-green">Best Seller</span>}
        {product.isOnSale && <span className="badge badge-red">Sale</span>}
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{product.name}</div>
        <div className={styles.stars}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} size={12} fill={i < Math.round(product.rating) ? '#ffc107' : 'none'} color={i < Math.round(product.rating) ? '#ffc107' : '#ccc'} />
          ))}
          <span>({product.reviewCount})</span>
        </div>
        <div className={styles.priceRow}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          {product.originalPrice && <span className={styles.oldPrice}>${product.originalPrice.toFixed(2)}</span>}
          <button className={styles.cartBtn} onClick={(e) => e.preventDefault()}>
            <ShoppingCart size={14} />
          </button>
        </div>
      </div>
    </Link>
  );
}

export default function Products() {
  const [params, setParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const category = params.get('category') || '';
  const search = params.get('search') || '';
  const [localSearch, setLocalSearch] = useState(search);

  const { data: catData } = useCategories();
  const { data, isLoading } = useProducts({ category, search, page, limit: 12 });

  const handleSearch = (e) => {
    e.preventDefault();
    setParams(localSearch ? { search: localSearch } : {});
    setPage(1);
  };

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.filterBlock}>
              <h3><SlidersHorizontal size={15} /> Filter by Category</h3>
              <ul>
                <li>
                  <button className={!category ? styles.activeFilter : ''} onClick={() => { setParams({}); setPage(1); }}>
                    All Products
                  </button>
                </li>
                {catData?.data?.map((cat) => (
                  <li key={cat.slug}>
                    <button
                      className={category === cat.slug ? styles.activeFilter : ''}
                      onClick={() => { setParams({ category: cat.slug }); setPage(1); }}
                    >
                      {cat.name} <span>{cat.productCount}+</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <main className={styles.main}>
            <form className={styles.searchBar} onSubmit={handleSearch}>
              <input
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search products..."
                className={styles.searchInput}
              />
              <button type="submit" className="btn btn-green btn-sm"><Search size={14} /> Search</button>
            </form>

            <div className={styles.resultsHeader}>
              <span>{data?.total ?? 0} products found</span>
            </div>

            {isLoading ? (
              <div className={styles.grid}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className={`${styles.card} skeleton`} style={{ height: 260 }} />
                ))}
              </div>
            ) : data?.data?.length ? (
              <div className={styles.grid}>
                {data.data.map((p) => <ProductCard key={p._id} product={p} />)}
              </div>
            ) : (
              <div className={styles.empty}>No products found.</div>
            )}

            {data?.pages > 1 && (
              <div className={styles.pagination}>
                {Array.from({ length: data.pages }, (_, i) => (
                  <button key={i + 1} className={page === i + 1 ? styles.activePage : ''} onClick={() => setPage(i + 1)}>
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
