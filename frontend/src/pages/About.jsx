import { Link } from 'react-router-dom';
import styles from './About.module.css';

const missionPoints = [
  'excellent consultation and customer service',
  'innovative designs',
  'quality tooling',
  'quality products',
  'best value for money',
];

export default function About() {
  return (
    <div className={styles.page}>

      {/* ── PAGE TITLE ── */}
      <div className={styles.titleBar}>
        <div className="container">
          <h1 className={styles.pageTitle}>About Us</h1>
        </div>
      </div>

      <div className="container">

        {/* ── HERO QUOTE ── */}
        <div className={styles.heroQuote}>
          <p>
            We believe that a great design and manufacturing a great product is
            awe-inspiring. With <strong>commitment</strong>, and dedicated{' '}
            <strong>hard work</strong> we will explore your dreams and together
            make them a reality
          </p>
        </div>

        {/* ── HISTORY ── */}
        <div className={styles.history}>
          <p>
            Founded in 1991 Beneficial Plastic Products started with the prime
            direction of manufacturing a plastic tap range, primarily for the
            Spring Water industry.
          </p>
          <p>
            With intelligent tooling we developed a comprehensive range of taps
            with different styles to suit multiple applications.
          </p>
          <p>
            Due to the increasing volume of tap products we increased our
            injection moulding machine numbers and toolmaking equipment, moving
            into custom moulding and the development of customer products.
          </p>
          <p>
            Emerging over the years into a competitive business, moulding for a
            variety of customers such as Electrolux, SA Diversified Products and
            PureKap, Beneficial Plastic Products still maintained its own product
            range which now equates to 80% of our core business.
          </p>
          <p>
            While we maintain a strong position in our core business area we have
            not lost sight of ensuring that we make our customers dreams become
            their reality.
          </p>
        </div>

        {/* ── MISSION ── */}
        <div className={styles.twoCol}>
          <div className={styles.colLabel}>
            <span>OUR MISSION</span>
          </div>
          <div className={styles.colContent}>
            <p className={styles.missionIntro}>
              Our mission is to make our customers dreams become a reality,
              providing:
            </p>
            <ul className={styles.bulletList}>
              {missionPoints.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── SERVICES ── */}
        <div className={styles.twoCol}>
          <div className={styles.colLabel}>
            <span>SERVICES</span>
          </div>
          <div className={styles.colContent}>

            <div className={styles.serviceBlock}>
              <h3 className={styles.serviceTitle}>Product Consulting</h3>
              <p>
                Our Managing Director has been in the Plastics industry since
                1976, consulting with and developing customers products. In 1989,
                in consultation with Piccadilly Natural Springs, we designed and
                manufactured for them the first spring water bottles and taps in
                Australia. We made their vision a reality. We will consult and
                work with <strong>you</strong> to make your vision a reality.
              </p>
            </div>

            <div className={styles.serviceBlock}>
              <h3 className={styles.serviceTitle}>Product Design/Tool Design</h3>
              <p>
                Product design is the most important part of ensuring product
                success, involving experts in each step ensures that the material
                selection and the product itself is fit for purpose and the
                environment. We pride ourselves on being able to design and
                manufacture any size tooling to a high quality standard, using
                high quality steel.
              </p>
            </div>

            <div className={styles.serviceBlock}>
              <h3 className={styles.serviceTitle}>Prototyping</h3>
              <p>
                To mitigate risk it is important to prototype the product in the
                same material to be used, assembling it into position to prove
                the design and tolerances prior to tooling. Our in-house 3D
                printing will ensure you receive a quality prototype in the best
                possible time. Silicon moulds to produce prototypes in the correct
                material being used are also available, if required.
              </p>
            </div>

            <div className={styles.serviceBlock}>
              <h3 className={styles.serviceTitle}>CNC Machining</h3>
              <p>
                CNC machining is the most effective process for machining tools to
                a very high tolerance. Our in-house CNC machine ensures
                repeatability, a high finish, competitive cost and best time
                management for your project.
              </p>
            </div>

            <div className={styles.serviceBlock}>
              <h3 className={styles.serviceTitle}>Tool Manufacturing</h3>
              <p>
                A big part of our business is manufacturing clients tools for
                production.
              </p>
              <p style={{ marginTop: '8px' }}>Whether you are:</p>
              <ul className={styles.bulletList}>
                <li>starting from scratch with a design, or</li>
                <li>needing a tool modification, or</li>
                <li>having unforeseen issues with your tools,</li>
              </ul>
              <p style={{ marginTop: '8px' }}>
                we are able to complete everything in-house to reduce downtime
                and keep costs at a minimum.
              </p>
            </div>

          </div>
        </div>

        {/* ── CTA ── */}
        <div className={styles.cta}>
          <Link to="/request-quote" className="btn btn-blue">Request a Quote</Link>
          <Link to="/contact" className="btn btn-outline-blue">Contact Us</Link>
        </div>

      </div>
    </div>
  );
}
