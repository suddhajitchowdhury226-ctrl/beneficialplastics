import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Star, Heart, Share2, Minus, Plus, ShieldCheck, Recycle, Truck, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import styles from './ContainerDetail.module.css';

import img44    from '../assets/44 LITRE INDUSTRIAL BIN & LID.png';
import img54    from '../assets/54 LITRE INDUSTRIAL BIN only.png';
import imgHC    from '../assets/Handy Case.png';

// ── STATIC PRODUCT DATA ───────────────────────────────────────────────────────
const PRODUCTS = {
  '44-litre-bin': {
    name: '44 LITRE INDUSTRIAL BIN & LID',
    price: 22.00,
    category: 'Containers',
    images: [img44],
    description: `A solid heavy-duty crate/storage bin with optional lid. They are stackable when used with a lid and will nest inside each other when not in use or fully full.

Purchase as a cumulative product (Bin and Lid) or purchase each sub-component separately.

Product price is for a black bin and lid. Please enquire for individual component price, bulk order best price or alternate colour price.

Need a larger crate/storage bin? See our 54 litre bin...`,
    measurements: '54cm x 34cm x 23cm',
    specs: [
      { key: 'Bin Size',              value: 'Length 540mm x width 340mm x 230mm' },
      { key: 'Weight (bin)',          value: '1.7 kgs' },
      { key: 'Weight (lid)',          value: '0.870 kgs' },
      { key: 'Colour options',        value: 'Available on bulk orders only' },
    ],
    related: ['54-litre-bin', 'handy-case'],
    reviews: [
      { author: 'James T.', rating: 5, date: 'March 2024', body: 'Extremely sturdy bins. We use them in our warehouse and they stack perfectly. Very happy with the quality.' },
      { author: 'Sarah M.', rating: 4, date: 'January 2024', body: 'Great product — solid build and the lid fits snugly. Ordered 20 for our factory floor.' },
    ],
  },
  '54-litre-bin': {
    name: '54 LITRE INDUSTRIAL BIN only',
    price: 18.00,
    category: 'Containers',
    images: [img54],
    description: `A solid heavy duty crate/storage bin that is extremely tough and durable. They are stackable and nest inside each other when not in use or full.

So strong that you can through them 3 metres up in the air and they will bounce off a concrete floor with no damage.

Please note that this bin does not come with a lid. Need a bin with a lid? See our 44 litre bin...`,
    measurements: '66cm x 34cm x 22cm',
    specs: [
      { key: 'Measurements',  value: '66cm x 34cm x 22cm' },
      { key: 'Used for',      value: 'Storage, worm farms' },
      { key: 'Colour options', value: 'Choice of colours available to order' },
      { key: 'Printing',      value: 'Available upon request' },
    ],
    related: ['44-litre-bin', 'handy-case'],
    reviews: [
      { author: 'Peter K.', rating: 5, date: 'April 2024', body: 'Bought 50 of these for worm farming. They are exactly as described — incredibly tough and nest nicely.' },
      { author: 'Linda R.', rating: 4, date: 'February 2024', body: 'Great storage bins at a good price. Very durable and easy to clean.' },
    ],
  },
  'handy-case': {
    name: 'Handy Case',
    price: 2.85,
    category: 'Containers',
    images: [imgHC],
    description: `Could be used as a display Case, production Case for instruments or just an all round handy Case.

Case measurements: 33cm x 25cm x 8cm
Material: Polypropylene

Pick up free. Postage will be calculated on each order delivery. Bulk order discounts on request.`,
    measurements: '33cm x 25cm x 8cm',
    specs: [
      { key: 'Dimensions',  value: '33cm x 25cm x 8cm' },
      { key: 'Material',    value: 'Polypropylene' },
      { key: 'Delivery',    value: 'Pick up free. Postage calculated per order.' },
      { key: 'Discounts',   value: 'Bulk order discounts on request' },
    ],
    related: ['44-litre-bin', '54-litre-bin'],
    reviews: [
      { author: 'Michael B.', rating: 5, date: 'May 2024', body: 'Perfect little case for storing small instruments. Very good value for money.' },
      { author: 'Anna W.',    rating: 4, date: 'March 2024', body: 'Solid polypropylene construction. Used them as display cases in our retail store.' },
    ],
  },
};

const RELATED_INFO = {
  '44-litre-bin': { name: '44 LITRE INDUSTRIAL BIN & LID', price: '22.00', img: img44 },
  '54-litre-bin': { name: '54 LITRE INDUSTRIAL BIN only',  price: '18.00', img: img54 },
  'handy-case':   { name: 'Handy Case',                    price: '2.85',  img: imgHC },
};

const BADGES = [
  { icon: ShieldCheck, label: 'SPECIAL PRICES' },
  { icon: ShieldCheck, label: 'SAFE & TRUSTWORTHY' },
  { icon: Truck,       label: 'FAST DELIVERY' },
  { icon: Recycle,     label: '100% RECYCLABLE' },
  { icon: Globe,       label: 'PROUDLY MADE BY BENEFICIAL PLASTICS' },
];

function StarRow({ rating, size = 15 }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          fill={i < rating ? '#ffc107' : 'none'}
          color={i < rating ? '#ffc107' : '#ccc'}
        />
      ))}
    </div>
  );
}

export default function ContainerDetail() {
  const { slug } = useParams();
  const product = PRODUCTS[slug];

  const [qty, setQty]   = useState(1);
  const [tab, setTab]   = useState('description'); // 'description' | 'reviews'
  const [imgIdx, setImgIdx] = useState(0);
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, body: '' });
  const [submitted, setSubmitted]   = useState(false);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Product not found</h2>
        <Link to="/products/containers" className="btn btn-blue">Back to Containers</Link>
      </div>
    );
  }

  const totalPrice = (product.price * qty).toFixed(2);

  const handleAddToCart = () => toast.success(`${product.name} added to cart!`);
  const handleShare = () => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!'); };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('Thank you for your review!');
  };

  return (
    <div className={styles.page}>
      <div className="container">

        {/* ── BREADCRUMB ── */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products/containers">Containers</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        {/* ── MAIN GRID ── */}
        <div className={styles.grid}>

          {/* LEFT — Images */}
          <div className={styles.imageCol}>
            <div className={styles.mainImgWrap}>
              {product.images.length > 1 && (
                <button className={`${styles.imgNav} ${styles.imgNavLeft}`} onClick={() => setImgIdx(i => Math.max(0, i - 1))}>
                  <ChevronLeft size={20} />
                </button>
              )}
              <img src={product.images[imgIdx]} alt={product.name} className={styles.mainImg} />
              {product.images.length > 1 && (
                <button className={`${styles.imgNav} ${styles.imgNavRight}`} onClick={() => setImgIdx(i => Math.min(product.images.length - 1, i + 1))}>
                  <ChevronRight size={20} />
                </button>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className={styles.thumbRow}>
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    className={`${styles.thumb} ${imgIdx === i ? styles.thumbActive : ''}`}
                    onClick={() => setImgIdx(i)}
                  >
                    <img src={img} alt={`View ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — Details */}
          <div className={styles.detailCol}>
            <span className={styles.catBadge}>{product.category}</span>
            <h1 className={styles.title}>{product.name}</h1>

            <p className={styles.shortDesc}>
              {product.description.split('\n\n')[0]}
            </p>
            {product.measurements && (
              <p className={styles.measurements}>
                <strong>Measurements:</strong> {product.measurements}
              </p>
            )}

            {/* Qty + Price */}
            <div className={styles.purchaseRow}>
              <div className={styles.qtyCtrl}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease"><Minus size={13} /></button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} aria-label="Increase"><Plus size={13} /></button>
              </div>
              <span className={styles.unitPrice}>
                Product Price: <strong>${product.price.toFixed(2)} x {qty}</strong>
              </span>
              <Link to="/request-quote" className={styles.freightBtn}>Freight Enquiry</Link>
            </div>

            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Product Total Price:</span>
              <span className={styles.totalPrice}>${totalPrice}</span>
              <button className={styles.wishlistBtn} aria-label="Wishlist"><Heart size={16} /></button>
              <button className={styles.shareBtn} aria-label="Share" onClick={handleShare}><Share2 size={16} /></button>
            </div>

            {/* Trust badges */}
            <div className={styles.badges}>
              {BADGES.map(({ icon: Icon, label }) => (
                <div key={label} className={styles.badge}>
                  <Icon size={22} className={styles.badgeIcon} />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <p className={styles.categoryTag}>
              Category: <Link to="/products/containers">Containers</Link>
            </p>
          </div>
        </div>

        {/* ── TABS ── */}
        <div className={styles.tabSection}>
          <div className={styles.tabBar}>
            <button
              className={`${styles.tab} ${tab === 'description' ? styles.tabActive : ''}`}
              onClick={() => setTab('description')}
            >
              Description
            </button>
            <button
              className={`${styles.tab} ${tab === 'reviews' ? styles.tabActive : ''}`}
              onClick={() => setTab('reviews')}
            >
              Reviews ({product.reviews.length})
            </button>
          </div>

          {/* Description panel */}
          {tab === 'description' && (
            <div className={styles.tabPanel}>
              <h2 className={styles.tabHeading}>Description</h2>
              {product.description.split('\n\n').map((para, i) => (
                <p key={i} className={styles.descPara}>{para}</p>
              ))}
              {product.specs.length > 0 && (
                <table className={styles.specTable}>
                  <tbody>
                    {product.specs.map((s) => (
                      <tr key={s.key}>
                        <td className={styles.specKey}>{s.key}</td>
                        <td className={styles.specVal}>{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Reviews panel */}
          {tab === 'reviews' && (
            <div className={styles.tabPanel}>
              <h2 className={styles.tabHeading}>Customer Reviews</h2>

              {/* Existing reviews */}
              <div className={styles.reviewList}>
                {product.reviews.map((r, i) => (
                  <div key={i} className={styles.reviewCard}>
                    <div className={styles.reviewHeader}>
                      <StarRow rating={r.rating} size={14} />
                      <span className={styles.reviewAuthor}>{r.author}</span>
                      <span className={styles.reviewDate}>{r.date}</span>
                    </div>
                    <p className={styles.reviewBody}>{r.body}</p>
                  </div>
                ))}
              </div>

              {/* Write a review form */}
              <div className={styles.reviewForm}>
                <h3 className={styles.reviewFormTitle}>Write a Review</h3>
                {submitted ? (
                  <p className={styles.reviewThanks}>Thank you! Your review has been submitted.</p>
                ) : (
                  <form onSubmit={handleReviewSubmit}>
                    <div className={styles.formRow}>
                      <label className={styles.formLabel}>Your Name</label>
                      <input
                        className={styles.formInput}
                        type="text"
                        required
                        placeholder="e.g. John Smith"
                        value={reviewForm.name}
                        onChange={e => setReviewForm(f => ({ ...f, name: e.target.value }))}
                      />
                    </div>
                    <div className={styles.formRow}>
                      <label className={styles.formLabel}>Rating</label>
                      <div className={styles.ratingPicker}>
                        {[1,2,3,4,5].map(n => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => setReviewForm(f => ({ ...f, rating: n }))}
                            aria-label={`${n} star`}
                          >
                            <Star
                              size={22}
                              fill={n <= reviewForm.rating ? '#ffc107' : 'none'}
                              color={n <= reviewForm.rating ? '#ffc107' : '#ccc'}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className={styles.formRow}>
                      <label className={styles.formLabel}>Your Review</label>
                      <textarea
                        className={styles.formTextarea}
                        rows={4}
                        required
                        placeholder="Share your experience with this product..."
                        value={reviewForm.body}
                        onChange={e => setReviewForm(f => ({ ...f, body: e.target.value }))}
                      />
                    </div>
                    <button type="submit" className="btn btn-blue">Submit Review</button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── RELATED PRODUCTS ── */}
        <div className={styles.related}>
          <h2 className={styles.relatedTitle}>Related products</h2>
          <div className={styles.relatedGrid}>
            {product.related.map((relSlug) => {
              const rel = RELATED_INFO[relSlug];
              return (
                <div key={relSlug} className={styles.relatedCard}>
                  <div className={styles.relatedImgWrap}>
                    <img src={rel.img} alt={rel.name} />
                  </div>
                  <div className={styles.relatedBody}>
                    <Link to={`/products/containers/${relSlug}`} className={styles.relatedName}>
                      {rel.name}
                    </Link>
                    <div className={styles.relatedPriceRow}>
                      <span className={styles.relatedPrice}>${rel.price}</span>
                      <button className={styles.relatedWish} aria-label="Wishlist"><Heart size={13} /></button>
                    </div>
                    <Link to={`/products/containers/${relSlug}`} className={styles.relatedBtn}>
                      View Product
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
