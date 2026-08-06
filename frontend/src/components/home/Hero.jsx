import { useState, useEffect, useCallback } from 'react';
import { Check, ArrowRight, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Hero.module.css';

const SLIDES = [
  {
    bg: '/hero-image.png',
    bgPosition: 'center center',
    bgSize: 'cover',
    bgFilter: 'none',
    badge: 'Australian Made',
    heading: ['Quality Plastic', 'Products Built', 'for Australia'],
    accentLine: 1,
    desc: 'Durable plastic products engineered for industry, agriculture, manufacturing and everyday use — with trusted Australia-wide delivery.',
  },
  {
    bg: '/hero-slide-2-clean.jpg',
    bgPosition: 'center center',
    bgSize: 'cover',
    bgFilter: 'none',
    badge: 'Reliable · Durable · Built to Last',
    heading: ['Custom Made', 'Quality Products', 'for Every Need'],
    accentLine: 1,
    desc: 'From BSP fittings to containers and taps — we manufacture plastic solutions built to withstand tough Australian conditions.',
  },
  {
    bg: '/hero-slide-3-clean.jpg',
    bgPosition: 'center center',
    bgSize: 'cover',
    bgFilter: 'none',
    badge: 'Premium Plastic Solutions',
    heading: ['Solutions', 'Built to Last'],
    accentLine: 0,
    desc: 'High-performance plastic fittings for agriculture, plumbing, irrigation and industrial applications. Engineered to perform.',
  },
];

const trustItems = [
  'Australian Made',
  'Fast Nationwide Delivery',
  'Recyclable Materials',
  'Industry Trusted',
];

const INTERVAL = 5000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((idx) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(idx);
    setTimeout(() => setAnimating(false), 700);
  }, [animating]);

  const prev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length);
  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);

  // Auto-advance
  useEffect(() => {
    const t = setTimeout(next, INTERVAL);
    return () => clearTimeout(t);
  }, [current, next]);

  const slide = SLIDES[current];

  return (
    <section id="home" className={styles.hero}>

      {/* Background slides */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className={`${styles.slideBg} ${i === current ? styles.slideBgActive : ''}`}
          style={{
            backgroundImage: `url('${s.bg}')`,
            backgroundPosition: s.bgPosition || 'center center',
            backgroundSize: s.bgSize || 'cover',
            filter: s.bgFilter || 'none',
          }}
        />
      ))}

      {/* Overlay */}
      <div className={styles.overlay} />

      {/* Content */}
      <div className="container">
        <div className={styles.inner}>
          <div className={`${styles.copy} ${animating ? styles.copyAnim : ''}`}>
            <div className={styles.badge}>{slide.badge}</div>
            <h1>
              {slide.heading.map((line, i) => (
                <span key={i} className={i === slide.accentLine ? styles.accentLine : ''}>
                  {line}
                </span>
              ))}
            </h1>
            <p className={styles.desc}>{slide.desc}</p>
            <div className={styles.ctaRow}>
              <a href="/#products" className={styles.ctaPrimary}>
                Explore Products <ArrowRight size={16} />
              </a>
              <a href="/#contact" className={styles.ctaSecondary}>
                <FileText size={15} /> Request a Quote
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev} aria-label="Previous slide">
        <ChevronLeft size={22} />
      </button>
      <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next} aria-label="Next slide">
        <ChevronRight size={22} />
      </button>

      {/* Dot indicators */}
      <div className={styles.dots}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Trust bar */}
      <div className={styles.trustBar}>
        <div className="container">
          <div className={styles.trustRow}>
            {trustItems.map((item) => (
              <span key={item} className={styles.trustItem}>
                <Check size={14} />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
