import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Star, Heart, Share2, Minus, Plus, ShieldCheck, Recycle, Truck, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import styles from './ContainerDetail.module.css';

import imgBottle   from '../assets/BOTTLE DRAINING TREE.png';
import imgPourers  from '../assets/POURERS.png';
import imgPushBtn  from '../assets/PUSH BUTTON TAP.png';
import imgSnapBSP  from '../assets/SNAP TAP – 3 4″ BSP.png';
import imgSnapBox  from '../assets/SNAP TAP – BOX of 25, 3  4″ BSP.png';
import imgSnapFem  from '../assets/SNAP TAP – FEMALE Thread 3   8″ BSP.png';
import imgSnap44   from '../assets/SNAP TAP – 44mm LONG THREAD.png';
import imgSnap441  from '../assets/SNAP TAP – 44mm LONG THREAD1.png';
import imgSnap442  from '../assets/SNAP TAP – 44mm LONG THREAD2.png';
import imgSnapStd  from '../assets/SNAP TAP – STANDARD Thread 3 4″ UNF.png';

// ── STATIC PRODUCT DATA ───────────────────────────────────────────────────────
const PRODUCTS = {
  'bottle-draining-tree': {
    name: 'Bottle Draining Tree',
    price: 31.79,
    shortDesc: 'Are you one of the millions of people who brew their own beer? Or do you operate a retail store or wholesale outlet that would benefit from selling a bottle draining tree?\n\nThe Bottle Draining Tree is an outstanding product of exceptional design and outstanding quality.',
    usedFor: 'Home Brew, Wine, Tomato Sauce making and draining for trial orders, commercial use.',
    description: `Are you one of the millions of people who brew their own beer? Or do you operate a retail store or wholesale outlet that would benefit from selling a bottle draining tree?

The Bottle Draining Tree is an outstanding product of exceptional design and manufacturing quality. Producing a high quality Polypropylene bottle with a deep drainage trough it allows for a clean finish, easy drainage and storing of any type of container or bottle. It doesn't matter if its beer, sauce, olive oil or juice, the Bottle Draining Tree will handle them all.

Supplied in a tree bracket form, the Bottle Draining Tree is easy to assemble and takes up minimal space when in use. Holds up to 45 bottles.

1. Small beer bottle
2. Large beer bottle (long neck)
3. Wine bottles
4. Mixers
5. Sauce Molds
6. Test Tubes
7. Industry containers

The tree enables draining and storing of bottles lying flat; it doesn't matter if its beer, sauce, olive oil or juice, the Bottle Draining Tree will handle them all.

Box Dimensions: 22.5 x 26 x 8.1
Pallet Dimension (which contains all bottle draining trees): 160 x 100 x 0.95
* We can send a box to reduce freight.`,
    specs: [
      { key: 'Capacity',        value: 'Holds up to 45 bottles' },
      { key: 'Box Dimensions',  value: '22.5 x 26 x 8.1 cm' },
      { key: 'Material',        value: 'Polypropylene' },
      { key: 'Assembly',        value: 'Easy self-assembly, tree bracket form' },
    ],
    images: [imgBottle],
    related: ['snap-tap-34-bsp', 'snap-tap-44mm-long-thread', 'snap-tap-34-bsp-copy', 'pourers'],
    reviews: [
      { author: 'Tom B.',    rating: 5, date: 'May 2024',      body: 'Perfect for my home brew setup. Easy to assemble and holds all my bottles. Great product!' },
      { author: 'Sandra K.', rating: 4, date: 'February 2024', body: 'Very well made. Drains bottles quickly and stores them neatly. Highly recommend.' },
    ],
  },
  'pourers': {
    name: 'Pourers',
    price: 7.30,
    shortDesc: 'Made from High Density Polypropylene (HDPE) each of the three types of pourers, suitable have different threads suitable for different drum/container types.\n\nAll pourers provide a drip free, easy transfer of liquids.',
    usedFor: 'Convenient or flow controlled pouring from drums and containers.',
    description: `STEEL DRUM POURER
Steel drum pourer fits 2B litre drums and handles water, petrol, disinfectants, oils and most other chemicals.

PLASTIC DRUM POURER
The plastic drum pourer fits 20 litre or 10 litre drums, handles water, petrol, disinfectants, oils, detergents and most other chemicals.

AG DRUM POURER
7/16P thread. The AG/Agricultural Drum Pourer is used for all types of fluids including chemicals. Suitable for 10 to 10 litre drums.

Additional benefits are:
• Made from recycled HDPE plastic which has high chemical and impact resistance. HDPE is also immune to rust, rotting, insects, mildew, and mould.
• Long Life Span: HDPE has high chemical, weather and impact resistance and can withstand external elements, preventing many years of long, drip free transfer of liquids.
• Durability: The durability of HDPE, while being lightweight is one of the most important factors for its use in the production of our pourers.
• Sustainability: In addition to all the above benefits, all pourers are recyclable.`,
    specs: [
      { key: 'Material',  value: 'High Density Polypropylene (HDPE)' },
      { key: 'Types',     value: 'Steel Drum / Plastic Drum / AG Drum' },
      { key: 'Use',       value: 'Water, petrol, chemicals, oils, disinfectants' },
    ],
    images: [imgPourers],
    related: ['snap-tap-standard-34-unf', 'snap-tap-34-bsp-copy', 'push-button-tap', 'snap-tap-box-25-34-bsp'],
    reviews: [
      { author: 'Mike F.',  rating: 5, date: 'April 2024',    body: 'Perfect pourers for our drums. Drip free and easy to use.' },
      { author: 'Julie D.', rating: 4, date: 'January 2024',  body: 'Good quality, fits our 20 litre drums perfectly.' },
    ],
  },
  'push-button-tap': {
    name: 'Push Button Tap',
    price: 6.50,
    shortDesc: 'Yet another exciting innovation from Beneficial Plastic Products, the hands-free push button tap is made to the same high standards as the snap action snap tap. Giving everything the snap tap has with one essential difference: this product is hands free.',
    usedFor: 'Dispensing fluids. Ideal for cold water applications and an excellent choice for spring water suppliers and bottle centre manufacturers.',
    description: `Press Button
Made from food grade Acetal (button) and food grade ABS. This guarantees that the tap offers not only longevity but also a good balance of impact, heat, chemical and abrasion resistance, allowing flexibility & tensile strength.

Application
All containers up 1GL & 30 litre plastic drums.`,
    specs: [
      { key: 'Button Material', value: 'Food grade Acetal' },
      { key: 'Body Material',   value: 'Food grade ABS' },
      { key: 'Application',     value: 'Containers up to 1GL & 30 litre plastic drums' },
      { key: 'Thread',          value: 'Standard fitting' },
    ],
    images: [imgPushBtn],
    related: ['snap-tap-34-bsp', 'snap-tap-34-bsp-copy', 'snap-tap-standard-34-unf', 'snap-tap-female-38-bsp'],
    reviews: [
      { author: 'Alex P.',  rating: 5, date: 'June 2024',      body: 'The hands-free action is brilliant. Perfect for our water dispensers.' },
      { author: 'Fiona G.', rating: 4, date: 'March 2024',     body: 'Great tap, solid build and easy to operate with one hand.' },
    ],
  },
  'snap-tap-34-bsp': {
    name: 'Snap Tap – 3/4″ BSP',
    price: 6.50,
    shortDesc: "Snap Tap – 3/4″ BSP has a larger lever circumference as compared to other Snap Taps.",
    usedFor: 'Dispensing fluids.',
    description: `AUSTRALIA'S No.1 SELF CLOSING TAP

The snap action snap tap is the first choice of the spring water suppliers and water cooler manufacturers. The Snap Tap is manufactured to resilient, heat resistant, food grade quality, polypropylene.

Becoming increasingly popular for hot water and any other water-based application.

The snap tap is capable of being manufactured in a variety of colours and is also available plated in gold (23 carat), chrome.

FINGERTIP PRESSURE
Just a flick of the finger activates the snap action snap tap, then another flick seals it firmly off.

NO DRIPS
Produce clear-off ensures no leaks, drops or puddles.

FAST FLOW
The snap tap features a smooth toggle mechanism for controlled filling and speedy hands-free pouring.

WORLD QUALITY
The snap tap is made of world-quality food-grade polypropylene.

DESIGN SERVICE
We can manufacture any special design and thread configuration to suit your needs.`,
    specs: [
      { key: 'Thread',   value: '3/4″ BSP' },
      { key: 'Material', value: 'Food grade Polypropylene' },
      { key: 'Colour',   value: 'Yellow (custom colours available)' },
      { key: 'Plating',  value: 'Available in gold (23 carat) or chrome' },
    ],
    images: [imgSnapBSP],
    related: ['snap-tap-box-25-34-bsp', 'snap-tap-standard-34-unf', 'bottle-draining-tree', 'pourers'],
    reviews: [
      { author: 'Robert L.', rating: 5, date: 'May 2024',      body: "Australia's best snap tap. Fits perfectly and never drips." },
      { author: 'Emma T.',   rating: 5, date: 'February 2024', body: 'Great quality. We use these on all our water coolers.' },
    ],
  },
  'snap-tap-34-bsp-copy': {
    name: 'Snap Tap – 3/4″ BSP (Copy)',
    price: 6.50,
    shortDesc: "Snap Tap – 3/4″ BSP has a larger lever circumference as compared to other Snap Taps.",
    usedFor: 'Dispensing fluids.',
    description: `AUSTRALIA'S No.1 SELF CLOSING TAP

The snap action snap tap is the first choice of the spring water suppliers and water cooler manufacturers. The Snap Tap is manufactured to resilient, heat-resistant food-grade quality, polypropylene.

Becoming increasingly popular for hot water and any other water-based application.

The snap tap is capable of being manufactured in a variety of colours and is also available plated in gold (23 carat), chrome.

FINGERTIP PRESSURE
Just a flick of the finger activates the snap action snap tap, then another flick seals it firmly off.

NO DRIPS
Produce clear-off ensures no leaks, drops or puddles.

FAST FLOW
The snap tap features a smooth toggle mechanism for controlled filling and speedy hands-free pouring.`,
    specs: [
      { key: 'Thread',   value: '3/4″ BSP' },
      { key: 'Material', value: 'Food grade Polypropylene' },
      { key: 'Colour',   value: 'Yellow (custom colours available)' },
    ],
    images: [imgSnapBSP],
    related: ['snap-tap-34-bsp', 'snap-tap-female-38-bsp', 'push-button-tap', 'snap-tap-standard-34-unf'],
    reviews: [
      { author: 'James O.', rating: 5, date: 'April 2024', body: 'Reliable snap tap, great quality for the price.' },
      { author: 'Paula N.', rating: 4, date: 'March 2024', body: 'Works perfectly on our dispensers.' },
    ],
  },
  'snap-tap-box-25-34-bsp': {
    name: 'Snap Tap – Box of 25, 3/4″ BSP',
    price: 85.25,
    shortDesc: "Each display box contains 25 snap taps. Choose between our Snap Tap – Standard or Home Brew versions.",
    usedFor: 'Dispensing fluids.',
    description: `AUSTRALIA'S No.1 SELF CLOSING TAP

Supplied together with 1 carton of 375 in a parent box of 25 taps from our standard yellow range.

The snap tap is capable of being manufactured in a variety of colours and is also available plated in gold (23 carat), chrome.

FINGERTIP PRESSURE
Just a flick of the finger activates the snap action snap tap, then another flick seals it firmly off.

NO DRIPS
Produce clear-off ensures no leaks, drops or puddles.

FAST FLOW
The snap tap features a smooth toggle mechanism for controlled filling and speedy hands-free pouring.

WORLD QUALITY
The snap tap is made of world-quality food-grade polypropylene.

DESIGN SERVICE
We can manufacture any special design and thread configuration to suit your needs.`,
    specs: [
      { key: 'Quantity',  value: '25 taps per box' },
      { key: 'Thread',    value: '3/4″ BSP' },
      { key: 'Material',  value: 'Food grade Polypropylene' },
      { key: 'Colour',    value: 'Yellow standard' },
    ],
    images: [imgSnapBox],
    related: ['push-button-tap', 'snap-tap-standard-34-unf', 'bottle-draining-tree', 'snap-tap-34-bsp-copy'],
    reviews: [
      { author: 'Chris M.', rating: 5, date: 'June 2024',      body: 'Bought a box of 25 for our wholesale business. All perfect quality.' },
      { author: 'Sue K.',   rating: 5, date: 'February 2024',  body: 'Great value buying in bulk. These taps never disappoint.' },
    ],
  },
  'snap-tap-female-38-bsp': {
    name: 'Snap Tap – Female Thread 3/8″ BSP',
    price: 6.50,
    shortDesc: 'Snap Tap – Female has a different focus as compared to other taps. This tap can be fitted onto a water/gas spring opening.',
    usedFor: 'Dispensing fluids.',
    description: `AUSTRALIA'S No.1 SELF CLOSING TAP

The snap action snap tap is the first choice of the spring water suppliers and water cooler manufacturers. The snap tap is resilient, heat-resistant polypropylene is becoming increasingly popular for hot water and any other water-based application.

The snap tap is capable of being manufactured in a variety of colours and is also available plated in gold (23 carat), chrome and copper.

FINGERTIP PRESSURE
Just a flick of the finger activates the snap action snap tap, then another flick seals it firmly off.

NO DRIPS
Produce clear-off ensures no leaks, drops or puddles.

FAST FLOW
The snap tap features a smooth toggle mechanism for controlled filling and speedy hands-free pouring.

WORLD QUALITY
The snap tap is made of world-quality food-grade polypropylene.

DESIGN SERVICE
We can manufacture any special design and thread configuration to suit your needs.`,
    specs: [
      { key: 'Thread',   value: '3/8″ BSP Female' },
      { key: 'Material', value: 'Food grade Polypropylene' },
      { key: 'Colour',   value: 'White/Blue (custom available)' },
      { key: 'Plating',  value: 'Available in gold, chrome, copper' },
    ],
    images: [imgSnapFem],
    related: ['snap-tap-standard-34-unf', 'pourers', 'push-button-tap', 'snap-tap-34-bsp-copy'],
    reviews: [
      { author: 'Nathan A.', rating: 5, date: 'May 2024',     body: 'Perfect for our spring water applications. Fits exactly right.' },
      { author: 'Kate S.',   rating: 4, date: 'March 2024',   body: 'Good quality female thread tap. Easy to install.' },
    ],
  },
  'snap-tap-44mm-long-thread': {
    name: 'Snap Tap – 44mm Long Thread',
    price: 6.50,
    shortDesc: 'The threaded area of Snap Tap – 44mm Long Thread has a longer length. Comes with a nut for 2-nut positions.',
    usedFor: 'Dispensing fluids.',
    description: `AUSTRALIA'S No.1 SELF CLOSING TAP

The snap action snap tap is the first choice of the spring water suppliers and water cooler manufacturers. The snap tap is resilient, heat-resistant polypropylene is becoming increasingly popular for hot water and any other water-based application.

The snap tap is capable of being manufactured in a variety of colours and is also available plated in gold (23 carat), chrome and copper.

FINGERTIP PRESSURE
Just a flick of the finger activates the snap action snap tap, then another flick seals it firmly off.

NO DRIPS
Produce clear-off ensures no leaks, drops or puddles.

FAST FLOW
The snap tap features a smooth toggle mechanism for controlled filling and speedy hands-free pouring.

WORLD QUALITY
The snap tap is made of world-quality food-grade polypropylene.

DESIGN SERVICE
We can manufacture any special design and thread configuration to suit your needs.`,
    specs: [
      { key: 'Thread Length', value: '44mm long thread' },
      { key: 'Material',      value: 'Food grade Polypropylene' },
      { key: 'Colour',        value: 'Black/Grey (custom available)' },
      { key: 'Extras',        value: 'Includes nut for 2 positions' },
    ],
    images: [imgSnap44, imgSnap441, imgSnap442],
    related: ['snap-tap-34-bsp', 'snap-tap-female-38-bsp', 'snap-tap-standard-34-unf', 'snap-tap-34-bsp-copy'],
    reviews: [
      { author: 'Gary W.', rating: 5, date: 'June 2024',     body: 'The longer thread is exactly what I needed for our thick-wall containers.' },
      { author: 'Mary J.', rating: 4, date: 'April 2024',    body: 'Good quality tap. The long thread gives much more flexibility in fitting.' },
    ],
  },
  'snap-tap-standard-34-unf': {
    name: 'Snap Tap – Standard Thread 3/4″ UNF',
    price: 6.50,
    shortDesc: 'Snap Tap – Standard has a shorter lever in comparison to other taps, and comes with a spring nut and 1 nut.',
    usedFor: 'Dispensing fluids.',
    description: `AUSTRALIA'S No.1 SELF CLOSING TAP

The snap action snap tap is the first choice of the spring water suppliers and water cooler manufacturers. The snap tap is resilient, heat-resistant polypropylene is becoming increasingly popular for hot water and any other water-based application.

The snap tap is capable of being manufactured in a variety of colours and is also available plated in gold (23 carat), chrome and copper.

FINGERTIP PRESSURE
Just a flick of the finger activates the snap action snap tap, then another flick seals it firmly off.

NO DRIPS
Produce clear-off ensures no leaks, drops or puddles.

FAST FLOW
The snap tap features a smooth toggle mechanism for controlled filling and speedy hands-free pouring.

WORLD QUALITY
The snap tap is made of world-quality food-grade polypropylene.

DESIGN SERVICE
We can manufacture any special design and thread configuration to suit your needs.`,
    specs: [
      { key: 'Thread',   value: '3/4″ UNF' },
      { key: 'Material', value: 'Food grade Polypropylene' },
      { key: 'Colour',   value: 'Blue/Navy (custom available)' },
      { key: 'Includes', value: 'Spring nut + 1 nut' },
    ],
    images: [imgSnapStd],
    related: ['push-button-tap', 'snap-tap-female-38-bsp', 'snap-tap-34-bsp', 'bottle-draining-tree'],
    reviews: [
      { author: 'Phil R.', rating: 5, date: 'May 2024',     body: 'The standard UNF thread fits our containers perfectly. Great self-closing action.' },
      { author: 'Anna M.', rating: 5, date: 'January 2024', body: 'Best snap tap on the market. Been using these for years.' },
    ],
  },
};

const ALL_INFO = {
  'bottle-draining-tree':       { name: 'Bottle Draining Tree',               price: '31.79', img: imgBottle  },
  'pourers':                    { name: 'Pourers',                             price: '7.30',  img: imgPourers },
  'push-button-tap':            { name: 'Push Button Tap',                     price: '6.50',  img: imgPushBtn },
  'snap-tap-34-bsp':            { name: 'Snap Tap – 3/4″ BSP',                 price: '6.50',  img: imgSnapBSP },
  'snap-tap-34-bsp-copy':       { name: 'Snap Tap – 3/4″ BSP (Copy)',          price: '6.50',  img: imgSnapBSP },
  'snap-tap-box-25-34-bsp':     { name: 'Snap Tap – Box of 25, 3/4″ BSP',      price: '85.25', img: imgSnapBox },
  'snap-tap-female-38-bsp':     { name: 'Snap Tap – Female Thread 3/8″ BSP',   price: '6.50',  img: imgSnapFem },
  'snap-tap-44mm-long-thread':  { name: 'Snap Tap – 44mm Long Thread',         price: '6.50',  img: imgSnap44  },
  'snap-tap-standard-34-unf':   { name: 'Snap Tap – Standard Thread 3/4″ UNF', price: '6.50',  img: imgSnapStd },
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

export default function HomeBrewDetail() {
  const { slug }  = useParams();
  const product   = PRODUCTS[slug];

  const [qty,        setQty]        = useState(1);
  const [tab,        setTab]        = useState('description');
  const [imgIdx,     setImgIdx]     = useState(0);
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, body: '' });
  const [submitted,  setSubmitted]  = useState(false);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Product not found</h2>
        <Link to="/products/home-brew" className="btn btn-blue">Back to Home Brew Products</Link>
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
          <Link to="/products/home-brew">Home Brew Products</Link>
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
            <span className={styles.catBadge}>Home Brew Products</span>
            <h1 className={styles.title}>{product.name}</h1>
            {product.shortDesc.split('\n\n').map((p, i) => (
              <p key={i} className={styles.shortDesc}>{p}</p>
            ))}
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
              Category: <Link to="/products/home-brew">Home Brew Products</Link>
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
                    <Link to={`/products/home-brew/${relSlug}`} className={styles.relatedName}>{rel.name}</Link>
                    <div className={styles.relatedPriceRow}>
                      <span className={styles.relatedPrice}>${rel.price}</span>
                      <button className={styles.relatedWish} aria-label="Wishlist"><Heart size={13} /></button>
                    </div>
                    <Link to={`/products/home-brew/${relSlug}`} className={styles.relatedBtn}>View Product</Link>
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
