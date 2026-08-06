import { Bot, MessageCircle, Wheat, Factory, Coffee, Beer, Wrench, ShoppingBag } from 'lucide-react';
import styles from './AiAssistant.module.css';

const INDUSTRIES = [
  { icon: Wheat,       label: 'Agriculture',        desc: 'Irrigation, fittings and tanks for farms.' },
  { icon: Factory,     label: 'Manufacturing',       desc: 'Industrial components built to last.' },
  { icon: Coffee,      label: 'Food Processing',     desc: 'Food-safe containers and fittings.' },
  { icon: Beer,        label: 'Home Brewer',         desc: 'Taps, pourers and brewing equipment.' },
  { icon: Wrench,      label: 'Plumbing',            desc: 'BSP fittings and adaptors.' },
  { icon: ShoppingBag, label: 'Retail Business',     desc: 'Packaging and consumer goods supply.' },
];

export default function AiAssistant() {
  return (
    <section id="industries" className={styles.section}>
      <div className="container">

        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>INDUSTRIES WE SERVE</span>
          <h2 className={styles.heading}>Trusted by Australian Businesses</h2>
          <p className={styles.sub}>Our products are used across a wide range of Australian industries.</p>
        </div>

        <div className={styles.grid}>

          {/* Industry cards */}
          <div className={styles.industryGrid}>
            {INDUSTRIES.map(({ icon: Icon, label, desc }) => (
              <div key={label} className={styles.industryCard}>
                <div className={styles.industryIcon}><Icon size={20} /></div>
                <div>
                  <div className={styles.industryName}>{label}</div>
                  <div className={styles.industryDesc}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* AI assistant card */}
          <div className={styles.aiCard}>
            <div className={styles.aiHeader}>
              <div className={styles.botIconWrap}><Bot size={26} /></div>
              <div>
                <h3 className={styles.aiTitle}>AI Product Assistant</h3>
                <p className={styles.aiSub}>Powered by AI</p>
              </div>
            </div>
            <p className={styles.aiDesc}>
              Not sure which product fits your needs? Our AI assistant helps you find the right product fast.
            </p>
            <div className={styles.chatPreview}>
              <div className={styles.chatBubbleLeft}>Looking for the right BSP fitting?</div>
              <div className={styles.chatBubbleRight}>I need one for a 44L drum.</div>
              <div className={styles.chatBubbleLeft}>Here are the best compatible products for you.</div>
            </div>
            <button className={styles.chatBtn}>
              <MessageCircle size={14} /> Chat Now
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
