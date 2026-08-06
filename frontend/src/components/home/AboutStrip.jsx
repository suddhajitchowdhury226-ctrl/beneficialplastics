import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Star, Quote, ShieldCheck, Leaf, Truck, Award } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './AboutStrip.module.css';

const REVIEWS = [
  { text: 'Great products, fast delivery and excellent customer service. Highly recommended!', author: 'James P.', role: 'Agriculture Industry', rating: 5 },
  { text: 'Excellent Australian quality. We use Beneficial Plastics for all our industrial needs.', author: 'Sarah M.', role: 'Manufacturing', rating: 5 },
  { text: 'Reliable, durable and affordable. Our go-to supplier for home brew equipment.', author: 'Michael T.', role: 'Home Brewer', rating: 5 },
  { text: 'Quality products at great prices. Fast delivery and easy ordering process every time.', author: 'David K.', role: 'Retail Business', rating: 5 },
  { text: 'We have been buying BSP fittings from Beneficial Plastics for years. Never let us down.', author: 'Rachel B.', role: 'Plumbing Contractor', rating: 5 },
  { text: 'Very impressed with the product range and competitive pricing. Will definitely order again.', author: 'Tom H.', role: 'Food & Beverage', rating: 5 },
];

const WHY_ITEMS = [
  { icon: ShieldCheck, text: 'Products built for long-term use' },
  { icon: Leaf,        text: 'Recyclable materials to reduce environmental impact' },
  { icon: Truck,       text: 'Fast, reliable shipping across all of Australia' },
  { icon: Award,       text: 'Premium materials, manufactured in Australia' },
];

function StarRow({ rating }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={13} fill={i < rating ? '#f6ad19' : 'none'} color={i < rating ? '#f6ad19' : '#ccc'} />
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div className={styles.reviewCard}>
      <Quote size={18} className={styles.quoteIcon} />
      <StarRow rating={review.rating} />
      <p className={styles.reviewText}>{review.text}</p>
      <div className={styles.reviewFooter}>
        <div className={styles.reviewAvatar}>{review.author.charAt(0)}</div>
        <div>
          <div className={styles.reviewAuthor}>{review.author}</div>
          <div className={styles.reviewRole}>{review.role}</div>
        </div>
      </div>
    </div>
  );
}

export default function AboutStrip() {
  return (
    <section id="about" className={styles.section}>
      <div className="container">

        {/* TOP — two columns: about text left, reviews right */}
        <div className={styles.topGrid}>

          {/* LEFT — about copy + why us */}
          <div className={styles.left}>
            <span className={styles.eyebrow}>ABOUT US</span>
            <h2 className={styles.heading}>
              Australia's Trusted<br />Plastic Products Manufacturer
            </h2>
            <p className={styles.body}>
              For over 20 years, Beneficial Plastics has been supplying durable, quality
              plastic products to Australian industries, farms, and households.
            </p>
            <ul className={styles.whyList}>
              {WHY_ITEMS.map(({ icon: Icon, text }) => (
                <li key={text} className={styles.whyItem}>
                  <div className={styles.whyIcon}><Icon size={15} /></div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
            <Link to="/about" className={styles.learnBtn}>Learn More About Us</Link>
          </div>

          {/* RIGHT — reviews slider */}
          <div className={styles.right}>
            <div className={styles.reviewsHeader}>
              <h3 className={styles.reviewsTitle}>What Our Customers Say</h3>
              <div className={styles.ratingPill}>
                <Star size={12} fill="#f6ad19" color="#f6ad19" />
                <span>4.9 / 5 from 1000+ customers</span>
              </div>
            </div>
            <Swiper
              modules={[Autoplay, Navigation]}
              navigation
              autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              loop
              speed={600}
              spaceBetween={14}
              slidesPerView={1}
              breakpoints={{ 900: { slidesPerView: 2 } }}
              className={styles.swiper}
            >
              {REVIEWS.map((r, i) => (
                <SwiperSlide key={i}>
                  <ReviewCard review={r} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </div>
    </section>
  );
}
