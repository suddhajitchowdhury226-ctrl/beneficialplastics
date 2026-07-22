import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './AboutStrip.module.css';

const REVIEWS = [
  {
    text: 'Great products, fast delivery and excellent customer service. Highly recommended!',
    author: 'James P.',
    role: 'Agriculture Industry',
    rating: 5,
  },
  {
    text: 'Excellent Australian quality. We use Beneficial Plastics for all our industrial needs.',
    author: 'Sarah M.',
    role: 'Manufacturing',
    rating: 5,
  },
  {
    text: 'Reliable, durable and affordable. Our go-to supplier for home brew equipment.',
    author: 'Michael T.',
    role: 'Home Brewer',
    rating: 5,
  },
  {
    text: 'Quality products at great prices. Fast delivery and easy ordering process every time.',
    author: 'David K.',
    role: 'Retail Business',
    rating: 5,
  },
  {
    text: 'We have been buying BSP fittings from Beneficial Plastics for years. Never let us down.',
    author: 'Rachel B.',
    role: 'Plumbing Contractor',
    rating: 5,
  },
  {
    text: 'Very impressed with the product range and competitive pricing. Will definitely order again.',
    author: 'Tom H.',
    role: 'Food & Beverage',
    rating: 5,
  },
];

function StarRow({ rating }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={14} fill={i < rating ? '#f6ad19' : 'none'} color={i < rating ? '#f6ad19' : '#ccc'} />
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div className={styles.reviewCard}>
      <Quote size={20} className={styles.quoteIcon} />
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
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>

          {/* LEFT — text */}
          <div className={styles.left}>
            <h2>
              Better Products.
              <em>Better Future.</em>
            </h2>
            <p>
              We believe durable, reusable and recyclable plastic products play an
              important role in reducing waste and delivering long-term value to
              Australian industries.
            </p>
            <Link to="/about" className={styles.learnBtn}>Learn More About Us</Link>
          </div>

          {/* CENTER — image */}
          <div className={styles.center}>
            <div className={styles.imgWrap}>
              <img
                src="/footer-top-logo.png"
                alt="Beneficial Plastics — Better Future"
                className={styles.centerImg}
              />
            </div>
          </div>

          {/* RIGHT — auto-sliding reviews */}
          <div className={styles.right}>
            <div className={styles.reviewsHeader}>
              <h2>What Our Customers Say</h2>
              <div className={styles.ratingPill}>
                <Star size={13} fill="#f6ad19" color="#f6ad19" />
                <span>4.9 / 5 from 1000+ customers</span>
              </div>
            </div>
            <Swiper
              modules={[Autoplay, Navigation]}
              navigation
              autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              loop
              speed={600}
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                640:  { slidesPerView: 1 },
                900:  { slidesPerView: 2 },
                1100: { slidesPerView: 2 },
              }}
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
