import { Link } from 'react-router-dom';
import styles from './ToolingServices.module.css';

import img1 from '../assets/toole1.png';
import img2 from '../assets/toole2.png';
import img3 from '../assets/toole3.png';
import img4 from '../assets/toole4.png';
import img5 from '../assets/toole5.png';

const services = [
  {
    img: img1,
    title: 'Product Consulting',
    desc: 'Our Managing Director has been in the Plastics industry since 1976, consulting with and developing customers products. In 1989, in consultation with Piccadilly Natural Springs, we designed and manufactured for them the first spring water bottles and taps in Australia. We made their vision a reality. We will consult and work with you to make your vision a reality.',
  },
  {
    img: img2,
    title: 'Product Design / Tool Design',
    desc: 'Product design is the most important part of ensuring product success. Involving experts in each step ensures that the material selection and the product itself is fit for purpose and the environment. We pride ourselves on being able to design and manufacture any size tooling to a high quality standard, using high quality steel.',
  },
  {
    img: img3,
    title: 'Prototyping',
    desc: 'To mitigate risk it is important to prototype the product in the same material to be used, assembling it into position to prove the design and tolerances prior to tooling. Our in-house 3D printing will ensure you receive a quality prototype in the best possible time. Silicon moulds to produce prototypes in the correct material being used are also available, if required.',
  },
  {
    img: img4,
    title: 'CNC Machining',
    desc: 'CNC machining is the most effective process for machining tools to a very high tolerance. Our in-house CNC machine ensures repeatability, a high finish, competitive cost and best time management for your project.',
  },
  {
    img: img5,
    title: 'Tool Manufacturing',
    desc: 'A big part of our business is manufacturing clients tools for production. Whether you are starting from scratch with a design, needing a tool modification, or having unforeseen issues with your tools — we are able to complete everything in-house to reduce downtime and keep costs at a minimum.',
  },
];

export default function ToolingServices() {
  return (
    <div className={styles.page}>
      <div className="container">

        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/services">Services</Link>
          <span>/</span>
          <span>Tooling Services</span>
        </nav>

        {/* Page title */}
        <h1 className={styles.pageTitle}>Tooling Services</h1>

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
