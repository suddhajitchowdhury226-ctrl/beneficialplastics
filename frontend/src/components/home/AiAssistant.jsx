import { Bot, MessageCircle, Wheat, Factory, Coffee, Beer, Zap, ShoppingBag } from 'lucide-react';
import styles from './AiAssistant.module.css';

const INDUSTRIES = [
  { icon: Wheat, label: 'Agriculture' },
  { icon: Factory, label: 'Manufacturing' },
  { icon: Coffee, label: 'Food Processing' },
  { icon: Beer, label: 'Brewing' },
  { icon: Zap, label: 'Industrial' },
  { icon: ShoppingBag, label: 'Retail' },
];

export default function AiAssistant() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>

          {/* AI CARD */}
          <div className={styles.aiCard}>
            <div className={styles.aiHeader}>
              <div className={styles.botIconWrap}>
                <Bot size={28} />
              </div>
              <div>
                <h3 className={styles.aiTitle}>AI Product Assistant</h3>
                <p className={styles.aiSub}>Powered by AI</p>
              </div>
            </div>
            <p className={styles.aiDesc}>
              Not sure which product you need? Chat with our AI assistant to find the perfect product for your needs.
            </p>
            {/* Chat preview */}
            <div className={styles.chatPreview}>
              <div className={styles.chatBubbleLeft}>
                Looking for the right BSP fitting?
              </div>
              <div className={styles.chatBubbleRight}>
                I need one for a 44L drum.
              </div>
              <div className={styles.chatBubbleLeft}>
                Here are the best compatible products for you.
              </div>
            </div>
            <button className={styles.chatBtn}>
              <MessageCircle size={15} /> Chat Now
            </button>
          </div>

          {/* INDUSTRIES CARD */}
          <div className={styles.industriesCard}>
            <h3 className={styles.industriesTitle}>Industries We Serve</h3>
            <p className={styles.industriesDesc}>Our products are trusted across a wide range of industries.</p>
            <div className={styles.industryGrid}>
              {INDUSTRIES.map(({ icon: Icon, label }) => (
                <div key={label} className={styles.industryItem}>
                  <div className={styles.industryIcon}><Icon size={18} /></div>
                  <div className={styles.industryName}>{label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
