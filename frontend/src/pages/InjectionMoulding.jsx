import { Link } from 'react-router-dom';
import styles from './ToolingServices.module.css';

import imgInjection from '../assets/Injection Moulding.png';
import imgDieTrials from '../assets/Die Trials.png';

const services = [
  {
    img: imgInjection,
    title: 'Injection Moulding',
    desc: 'We operate a range of injection moulding machines with shot capacities to suit both small and large component production runs. Our experienced team manages everything from material selection and process setup through to quality inspection, ensuring consistent, high-tolerance parts are delivered on time — every time.',
  },
  {
    img: imgDieTrials,
    title: 'Die Trials',
    desc: 'Before committing to full production, die trials validate that the tooling performs to specification in the actual moulding environment. We carry out comprehensive die trials to confirm gate positioning, cycle times, shrinkage rates and surface finish quality, giving you complete confidence in your tool before volume production begins.',
  },
];

export default function InjectionMoulding() {
  return (
    <div className={styles.page}>
      <div className="container">

        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/services">Services</Link>
          <span>/</span>
          <span>Injection Moulding Services</span>
        </nav>

        {/* Page title */}
        <h1 className={styles.pageTitle}>Injection Moulding Services</h1>

        {/* Service rows */}
        <div className={styles.list}>
          {services.map((svc, i) => (
            <div key={i} className={styles.row}>
              <div className={styles.imgWrap}>
                <img src={svc.img} alt={svc.title} className={styles.img} />
              </div>
              <div className={styles.content}>
                <h2 className={styles.serviceTitle}>{svc.title}</h2>
                <p className={styles.serviceDesc}>{svc.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <Link to="/request-quote" className="btn btn-blue">Request a Quote</Link>
          <Link to="/contact" className="btn btn-outline-blue">Contact Us</Link>
        </div>

      </div>
    </div>
  );
}
