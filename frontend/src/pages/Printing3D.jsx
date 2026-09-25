import { Link } from 'react-router-dom';
import styles from './Printing3D.module.css';

import imgPrintingServices from '../assets/3D Printing Services.png';
import imgLiquidPrinter    from '../assets/Liquid 3D Printer.png';
import imgFilament         from '../assets/3D Filament Printing.png';
import imgFilament1        from '../assets/3D Filament Printing1.png';
import imgMaterials        from '../assets/Materials.png';

const aboutPoints = [
  'Replacement of traditional molding and cast urethane processes',
  'Rapid functional prototyping and fast concept models',
  'Investment casting patterns for jewelry',
  'End-use durable plastic parts',
  'Short run production of plastic articles',
  'Jigs and fixtures',
  'Rapid tooling — molds and master patterns',
  'Elastomeric parts — prototypes of grommets, seals, hoses, weatherstripping, tubes, gaskets, spacers and other vibration dampening components',
  'Medical applications requiring biocompatibility and/or thermal resistance',
];

export default function Printing3D() {
  return (
    <div className={styles.page}>
      <div className="container">

        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/services">Services</Link>
          <span>/</span>
          <span>3D Printing</span>
        </nav>

        {/* ── HERO SECTION ── */}
        <section className={styles.heroSection}>
          <div className={styles.heroText}>
            <h1 className={styles.pageTitle}>3D Printing</h1>
            <p className={styles.heroSub}>3D Printing Services</p>
          </div>
        </section>

        {/* ── PRINTER SHOWCASE ── */}
        <section className={styles.showcase}>
          <div className={styles.showcaseImg}>
            <img src={imgPrintingServices} alt="3D Printing Services" />
          </div>
          <div className={styles.showcaseRight}>
            <div className={styles.showcaseImg}>
              <img src={imgLiquidPrinter} alt="Liquid 3D Printer" />
            </div>
            <p className={styles.showcaseLabel}>Liquid 3D Printer</p>
          </div>
        </section>

        {/* ── KEY BENEFITS ── */}
        <section className={styles.benefits}>
          <div className={styles.benefitItem}>
            <h3 className={styles.benefitTitle}>Affordable and versatile</h3>
            <p className={styles.benefitDesc}>
              Affordable and versatile for low-volume production and fast prototyping, offering
              quality and accuracy with industrial-grade durability, service and support.
            </p>
          </div>
          <div className={styles.benefitItem}>
            <h3 className={styles.benefitTitle}>Prototyping to production</h3>
            <p className={styles.benefitDesc}>
              Same day prototyping and direct digital production of tens and hundreds of parts
              per month.
            </p>
          </div>
        </section>

        {/* ── ABOUT THIS PRINTER ── */}
        <section className={styles.aboutSection}>
          <h2 className={styles.sectionTitle}>About this printer</h2>
          <ul className={styles.bulletList}>
            {aboutPoints.map((pt, i) => (
              <li key={i}>{pt}</li>
            ))}
          </ul>
        </section>

        {/* ── BROAD RANGE OF MATERIALS ── */}
        <section className={styles.materialsSection}>
          <h2 className={styles.sectionTitleAlt}>Broad Range of Materials</h2>
          <p className={styles.materialsDesc}>
            3D Systems' Material Design Center has over 30 years of proven R&amp;D experience and
            process development expertise. The broad and expanding range of materials available
            for Figure 4 Standalone addresses a wide variety of application needs, for functional
            prototyping, direct production of end-use parts, molding and casting, and includes
            rigid and durable with thermoplastic-like behaviors, rubber-like, castable, heat
            resistant, and biocompatible capable materials.
          </p>
        </section>

        {/* ── 3D FILAMENT PRINTING ── */}
        <section className={styles.filamentSection}>
          <h2 className={styles.filamentTitle}>3D Filament Printing</h2>

          <div className={styles.filamentGrid}>
            {/* Left — machine images */}
            <div className={styles.filamentImages}>
              <div className={styles.filamentImgWrap}>
                <img src={imgFilament} alt="3D Filament Printer" />
              </div>
              <div className={styles.filamentImgWrap}>
                <img src={imgFilament1} alt="PEEK-300 High Performance 3D Printer" />
              </div>
            </div>

            {/* Right — materials image */}
            <div className={styles.filamentMaterials}>
              <p className={styles.materialsLabel}>Materials</p>
              <div className={styles.materialsImgWrap}>
                <img src={imgMaterials} alt="Available Materials" />
              </div>
              <p className={styles.materialsNote}>
                A wide range of engineering-grade filament materials available including PEEK,
                carbon fibre, nylon, TPU, PLA and more — designed for demanding functional and
                structural applications.
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <div className={styles.cta}>
          <Link to="/request-quote" className="btn btn-blue">Request a Quote</Link>
          <Link to="/contact" className="btn btn-outline-blue">Contact Us</Link>
        </div>

      </div>
    </div>
  );
}
