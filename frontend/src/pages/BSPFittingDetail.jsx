import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Star, Heart, Share2, Minus, Plus, ShieldCheck, Recycle, Truck, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import styles from './ContainerDetail.module.css'; // reuse identical layout styles

import imgAdaptor        from '../assets/BSP Adaptor.png';
import imgAdaptorWasher  from '../assets/BSP ADAPTOR WASHER SET.png';
import imgBungCap        from '../assets/BSP BUNG CAP.png';
import imgWasher         from '../assets/BSP WASHER.png';
import imgCamlockAdaptor from '../assets/CAMLOCK ADAPTOR.png';
import imgCamlockSet     from '../assets/CAMLOCK ADAPTOR, CAP AND WASHER SET.png';
import imgCamlockBung    from '../assets/CAMLOCK BUNG CAP.png';
import imgCamlockWasher  from '../assets/CAMLOCK WASHER.png';

// ── STATIC PRODUCT DATA ───────────────────────────────────────────────────────
const PRODUCTS = {
  'bsp-adaptor': {
    name: 'BSP Adaptor',
    price: 6.30,
    shortDesc: 'These are mostly used to fit onto IBCs and hose connections across various industries from pharmaceuticals to heavy machinery which has liquids transitioning through the pipes.',
    usedFor: 'Thread Adaptor from a 2" BSP Thread to a 2" Buttress Thread.',
    description: `The BSP Adaptor can be bought separately or with a washer — refer BSP Adaptor Washer Set.

Each component i.e. adaptor and washer can also be bought separately as well as a set.`,
    specs: [
      { key: 'Thread',    value: '2" BSP to 2" Buttress Thread' },
      { key: 'Material',  value: 'Polypropylene' },
      { key: 'Colour',    value: 'Black' },
    ],
    images: [imgAdaptor],
    related: ['bsp-adaptor-washer-set', 'camlock-washer', 'camlock-bung-cap', 'camlock-adaptor-cap-washer-set'],
    reviews: [
      { author: 'David H.', rating: 5, date: 'April 2024', body: 'Perfect fit for our IBC tanks. Great quality at a good price.' },
      { author: 'Rachel T.', rating: 4, date: 'February 2024', body: 'Solid adaptor, threads nicely. Will order again.' },
    ],
  },
  'bsp-adaptor-washer-set': {
    name: 'BSP Adaptor Washer Set',
    price: 6.70,
    shortDesc: 'These are mostly used to fix onto IBCs and hose connections across various industries from pharmaceuticals to heavy machinery which has liquids transitioning through the pipes.',
    usedFor: 'IBCs and Containers and alike. Thread Adaptor from a 2" BSP Thread to a 2" Buttress Thread.',
    description: `Each component i.e. adaptor and washer can also be bought separately.

The set includes one BSP Adaptor and one BSP Washer, providing a complete sealing solution for IBC fittings.`,
    specs: [
      { key: 'Contents',  value: '1x BSP Adaptor + 1x BSP Washer' },
      { key: 'Thread',    value: '2" BSP to 2" Buttress Thread' },
      { key: 'Material',  value: 'Polypropylene' },
    ],
    images: [imgAdaptorWasher],
    related: ['camlock-adaptor-cap-washer-set', 'camlock-washer', 'bsp-bung-cap', 'bsp-adaptor'],
    reviews: [
      { author: 'Mark L.', rating: 5, date: 'May 2024', body: 'Great value as a set. Both components fit perfectly on our IBCs.' },
      { author: 'Jenny W.', rating: 4, date: 'March 2024', body: 'Good quality washer set, exactly as described.' },
    ],
  },
  'bsp-bung-cap': {
    name: 'BSP Bung Cap',
    price: 0.75,
    shortDesc: 'Provided with washers they help in obtaining a tight fit for containers, especially those containers wherein liquid is transported.',
    usedFor: 'Drum sealing cap.',
    description: `Dimensions: 2"
Colour: Blue & Black. Product is inclusive of the washer.
* BSP = British Standard Pipe (UK, fine parallel thread)`,
    specs: [
      { key: 'Dimensions', value: '2"' },
      { key: 'Colour',     value: 'Blue & Black' },
      { key: 'Material',   value: 'Polypropylene (PP)' },
      { key: 'Includes',   value: 'Washer included' },
    ],
    images: [imgBungCap],
    related: ['camlock-washer', 'camlock-adaptor-cap-washer-set', 'bsp-adaptor-washer-set', 'bsp-washer'],
    reviews: [
      { author: 'Chris P.', rating: 5, date: 'June 2024', body: 'Excellent bung caps. Seal very well and the blue colour makes them easy to spot.' },
      { author: 'Sam R.',   rating: 4, date: 'January 2024', body: 'Good quality cap, fits snugly on our drums.' },
    ],
  },
  'bsp-washer': {
    name: 'BSP Washer',
    price: 0.60,
    shortDesc: 'The washers sit inside the BSP adaptors, fastening to the pipe flanges. It helps achieve a leak-free connection.',
    usedFor: 'A Seal.',
    description: `Each component i.e. adaptor and washer can also be bought separately as well as a set.

Should be 56mm O.D. x 43mm I.D.`,
    specs: [
      { key: 'Outer Diameter', value: '56mm' },
      { key: 'Inner Diameter', value: '43mm' },
      { key: 'Material',       value: 'Polypropylene' },
    ],
    images: [imgWasher],
    related: ['bsp-adaptor-washer-set', 'bsp-adaptor', 'camlock-adaptor', 'bsp-bung-cap'],
    reviews: [
      { author: 'Brian K.', rating: 5, date: 'March 2024', body: 'Perfect fit, exactly the right dimensions for our BSP adaptors.' },
      { author: 'Lisa M.',  rating: 4, date: 'December 2023', body: 'Good quality washers, arrived quickly.' },
    ],
  },
  'camlock-adaptor': {
    name: 'Camlock Adaptor',
    price: 6.50,
    shortDesc: 'These are mostly used to fit onto hoses across various industries from pharmaceuticals to heavy machinery which has liquids transitioning through the pipes. The threading provided on the larger opening helps achieve a good hold to the reception container.',
    usedFor: 'Fitting used for IBCs to a quick action Camlock Fitting.',
    description: `Each component i.e. adaptor, cap and washer can also be bought separately as well as a set.

The Camlock Adaptor features a threaded end for secure container attachment and a cam-and-groove coupling for fast, tool-free connection to hoses.`,
    specs: [
      { key: 'Type',     value: 'Cam & Groove Coupling' },
      { key: 'Material', value: 'Polypropylene' },
      { key: 'Colour',   value: 'Cream / Natural' },
    ],
    images: [imgCamlockAdaptor],
    related: ['bsp-adaptor', 'bsp-bung-cap', 'camlock-washer', 'bsp-washer'],
    reviews: [
      { author: 'Tom A.',   rating: 5, date: 'May 2024', body: 'Exactly what I needed. Very easy to connect and disconnect.' },
      { author: 'Paula N.', rating: 4, date: 'February 2024', body: 'Good quality camlock. Fits our IBCs perfectly.' },
    ],
  },
  'camlock-adaptor-cap-washer-set': {
    name: 'Camlock Adaptor, Cap and Washer Set',
    price: 6.95,
    shortDesc: 'These are mostly used to fix onto hoses across various industries from pharmaceuticals to heavy machinery which has liquids transitioning through the pipes. The cap can be placed inverted or in the normal way for locking the perforation.',
    usedFor: 'Fitting used for IBCs to a quick action Camlock Fitting.',
    description: `Each component i.e. adaptor, cap and washer can also be bought separately as well as in the set.

The complete set provides everything needed for a secure, leak-free camlock fitting — includes the adaptor body, bung cap and sealing washer.`,
    specs: [
      { key: 'Contents',  value: '1x Camlock Adaptor + 1x Bung Cap + 1x Washer' },
      { key: 'Material',  value: 'Polypropylene' },
      { key: 'Colour',    value: 'Cream / Yellow' },
    ],
    images: [imgCamlockSet],
    related: ['bsp-adaptor-washer-set', 'bsp-adaptor', 'bsp-bung-cap', 'camlock-washer'],
    reviews: [
      { author: 'George B.', rating: 5, date: 'April 2024', body: 'Great set, all three pieces fit together perfectly. Great value.' },
      { author: 'Helen S.',  rating: 5, date: 'March 2024', body: 'Ordered 50 sets for our production line. All perfect quality.' },
    ],
  },
  'camlock-bung-cap': {
    name: 'Camlock Bung Cap',
    price: 0.45,
    shortDesc: 'These are mostly used to fix onto hoses across various industries from pharmaceuticals to heavy machinery which has liquids transitioning through the pipes. The cap can be placed inverted or in the normal way for locking the perforation.',
    usedFor: 'Fitting used for IBC liquid transfer.',
    description: `Each component i.e. adaptor, cap and washer can also be bought separately as well as a set.

The Camlock Bung Cap securely seals the camlock fitting opening when not in use, preventing contamination and leakage.`,
    specs: [
      { key: 'Material', value: 'Polypropylene' },
      { key: 'Colour',   value: 'Yellow' },
      { key: 'Use',      value: 'Cap / closure for camlock fittings' },
    ],
    images: [imgCamlockBung],
    related: ['bsp-adaptor-washer-set', 'bsp-washer', 'bsp-adaptor', 'bsp-bung-cap'],
    reviews: [
      { author: 'Nathan F.', rating: 5, date: 'June 2024', body: 'Small but essential. Fits perfectly and keeps things sealed.' },
      { author: 'Claire O.', rating: 4, date: 'April 2024', body: 'Good quality cap at a great price.' },
    ],
  },
  'camlock-washer': {
    name: 'Camlock Washer',
    price: 0.60,
    shortDesc: 'IBC gaskets, otherwise known as ring-type or raised-faced joints, sit inside the adaptors fastening the pipe flanges. It helps achieve a leak-free connection.',
    usedFor: 'Fitting used for IBCs to seal.',
    description: `Each component i.e. adaptor, cap and washer can also be bought separately as well as a set.

These are mostly used in hoses across various industries from pharmaceuticals to heavy machinery which has liquids transitioning through the pipes.`,
    specs: [
      { key: 'Type',     value: 'Ring / Gasket Seal' },
      { key: 'Material', value: 'Polypropylene' },
      { key: 'Colour',   value: 'Black' },
    ],
    images: [imgCamlockWasher],
    related: ['bsp-adaptor-washer-set', 'camlock-adaptor-cap-washer-set', 'bsp-washer', 'bsp-adaptor'],
    reviews: [
      { author: 'Kevin D.', rating: 5, date: 'May 2024', body: 'Excellent washer, creates a perfect seal every time.' },
      { author: 'Amy C.',   rating: 4, date: 'March 2024', body: 'Great quality, exactly what was needed for our camlock fittings.' },
    ],
  },
};

const ALL_INFO = {
  'bsp-adaptor':                     { name: 'BSP Adaptor',                          price: '6.30', img: imgAdaptor },
  'bsp-adaptor-washer-set':           { name: 'BSP Adaptor Washer Set',               price: '6.70', img: imgAdaptorWasher },
  'bsp-bung-cap':                     { name: 'BSP Bung Cap',                         price: '0.75', img: imgBungCap },
  'bsp-washer':                       { name: 'BSP Washer',                           price: '0.60', img: imgWasher },
  'camlock-adaptor':                  { name: 'Camlock Adaptor',                      price: '6.50', img: imgCamlockAdaptor },
  'camlock-adaptor-cap-washer-set':   { name: 'Camlock Adaptor, Cap and Washer Set',  price: '6.95', img: imgCamlockSet },
  'camlock-bung-cap':                 { name: 'Camlock Bung Cap',                     price: '0.45', img: imgCamlockBung },
  'camlock-washer':                   { name: 'Camlock Washer',                       price: '0.60', img: imgCamlockWasher },
};

const BADGES = [
  { icon: ShieldCheck, label: 'SPECIAL PRICES' },
  { icon: ShieldCheck, label: 'SAFE & TRUSTWORTHY' },
  { icon: Truck,       label: 'FAST DELIVERY' },
  { icon: Recycle,     label: '100% RECYCLABLE' },
  { icon: Globe,       label: 'PROUDLY MADE BY BENEFICIAL PLASTICS' },
  { icon: Globe,       label: 'ECO FRIENDLY' },
];

function StarRow({ rating, size = 15 }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={size}
          fill={i < rating ? '#ffc107' : 'none'}
          color={i < rating ? '#ffc107' : '#ccc'} />
      ))}
    </div>
  );
}

export default function BSPFittingDetail() {
  const { slug } = useParams();
  const product  = PRODUCTS[slug];

  const [qty,          setQty]          = useState(1);
  const [tab,          setTab]          = useState('description');
  const [imgIdx,       setImgIdx]       = useState(0);
  const [reviewForm,   setReviewForm]   = useState({ name: '', rating: 5, body: '' });
  const [submitted,    setSubmitted]    = useState(false);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Product not found</h2>
        <Link to="/products/bsp-fittings" className="btn btn-blue">Back to BSP Fittings</Link>
      </div>
    );
  }

  const totalPrice = (product.price * qty).toFixed(2);
  const handleShare = () => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!'); };
  const handleReviewSubmit = (e) => { e.preventDefault(); setSubmitted(true); toast.success('Thank you for your review!'); };

  return (
    <div className={styles.page}>
      <div className="container">

        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products/bsp-fittings">BSP Fittings</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        {/* Main grid */}
        <div className={styles.grid}>

          {/* LEFT — image */}
          <div className={styles.imageCol}>
            <div className={styles.mainImgWrap}>
              {product.images.length > 1 && (
                <button className={`${styles.imgNav} ${styles.imgNavLeft}`} onClick={() => setImgIdx(i => Math.max(0, i - 1))}><ChevronLeft size={20} /></button>
              )}
              <img src={product.images[imgIdx]} alt={product.name} className={styles.mainImg} />
              {product.images.length > 1 && (
                <button className={`${styles.imgNav} ${styles.imgNavRight}`} onClick={() => setImgIdx(i => Math.min(product.images.length - 1, i + 1))}><ChevronRight size={20} /></button>
              )}
            </div>
            {product.images.length > 1 && (
              <div className={styles.thumbRow}>
                {product.images.map((img, i) => (
                  <button key={i} className={`${styles.thumb} ${imgIdx === i ? styles.thumbActive : ''}`} onClick={() => setImgIdx(i)}>
                    <img src={img} alt={`View ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — details */}
          <div className={styles.detailCol}>
            <span className={styles.catBadge}>BSP Fittings</span>
            <h1 className={styles.title}>{product.name}</h1>
            <p className={styles.shortDesc}>{product.shortDesc}</p>
            {product.usedFor && (
              <p className={styles.measurements}>
                <strong>Used for:</strong> {product.usedFor}
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
              <button className={styles.freightBtn} onClick={() => toast.success('Added to cart!')}>
                Add to cart
              </button>
            </div>

            {/* Total */}
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Product Total Price:</span>
              <span className={styles.totalPrice}>${totalPrice}</span>
              <button className={styles.wishlistBtn} aria-label="Wishlist"><Heart size={16} /></button>
              <button className={styles.shareBtn}    aria-label="Share" onClick={handleShare}><Share2 size={16} /></button>
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
              Category: <Link to="/products/bsp-fittings">BSP Fittings</Link>
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabSection}>
          <div className={styles.tabBar}>
            <button className={`${styles.tab} ${tab === 'description' ? styles.tabActive : ''}`} onClick={() => setTab('description')}>
              Description
            </button>
            <button className={`${styles.tab} ${tab === 'reviews' ? styles.tabActive : ''}`} onClick={() => setTab('reviews')}>
              Reviews ({product.reviews.length})
            </button>
          </div>

          {tab === 'description' && (
            <div className={styles.tabPanel}>
              <h2 className={styles.tabHeading}>Description</h2>
              {product.description.split('\n\n').map((para, i) => (
                <p key={i} className={styles.descPara}>{para}</p>
              ))}
              {product.specs.length > 0 && (
                <table className={styles.specTable}>
                  <tbody>
                    {product.specs.map(s => (
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

          {tab === 'reviews' && (
            <div className={styles.tabPanel}>
              <h2 className={styles.tabHeading}>Customer Reviews</h2>
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
              <div className={styles.reviewForm}>
                <h3 className={styles.reviewFormTitle}>Write a Review</h3>
                {submitted ? (
                  <p className={styles.reviewThanks}>Thank you! Your review has been submitted.</p>
                ) : (
                  <form onSubmit={handleReviewSubmit}>
                    <div className={styles.formRow}>
                      <label className={styles.formLabel}>Your Name</label>
                      <input className={styles.formInput} type="text" required placeholder="e.g. John Smith"
                        value={reviewForm.name} onChange={e => setReviewForm(f => ({ ...f, name: e.target.value }))} />
                    </div>
                    <div className={styles.formRow}>
                      <label className={styles.formLabel}>Rating</label>
                      <div className={styles.ratingPicker}>
                        {[1,2,3,4,5].map(n => (
                          <button key={n} type="button" onClick={() => setReviewForm(f => ({ ...f, rating: n }))} aria-label={`${n} star`}>
                            <Star size={22} fill={n <= reviewForm.rating ? '#ffc107' : 'none'} color={n <= reviewForm.rating ? '#ffc107' : '#ccc'} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className={styles.formRow}>
                      <label className={styles.formLabel}>Your Review</label>
                      <textarea className={styles.formTextarea} rows={4} required placeholder="Share your experience..."
                        value={reviewForm.body} onChange={e => setReviewForm(f => ({ ...f, body: e.target.value }))} />
                    </div>
                    <button type="submit" className="btn btn-blue">Submit Review</button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Related products */}
        <div className={styles.related}>
          <h2 className={styles.relatedTitle}>Related products</h2>
          <div className={styles.relatedGrid} style={{ gridTemplateColumns: 'repeat(4, 160px)' }}>
            {product.related.map(relSlug => {
              const rel = ALL_INFO[relSlug];
              if (!rel) return null;
              return (
                <div key={relSlug} className={styles.relatedCard}>
                  <div className={styles.relatedImgWrap}>
                    <img src={rel.img} alt={rel.name} />
                  </div>
                  <div className={styles.relatedBody}>
                    <Link to={`/products/bsp-fittings/${relSlug}`} className={styles.relatedName}>{rel.name}</Link>
                    <div className={styles.relatedPriceRow}>
                      <span className={styles.relatedPrice}>${rel.price}</span>
                      <button className={styles.relatedWish} aria-label="Wishlist"><Heart size={13} /></button>
                    </div>
                    <Link to={`/products/bsp-fittings/${relSlug}`} className={styles.relatedBtn}>View Product</Link>
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
