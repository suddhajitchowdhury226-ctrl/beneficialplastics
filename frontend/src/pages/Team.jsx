import styles from './Team.module.css';
import malcolmImg from '../assets/team.png';

const members = [
  {
    img: malcolmImg,
    name: 'MALCOLM LEAHY',
    title: 'MANAGING DIRECTOR',
    bio: 'Malcolm has been in the plastic industry for over 22 years and has extensive experience in Injection and Blow Moulding and Toolmaking.',
  },
];

export default function Team() {
  return (
    <div className={styles.page}>
      <div className="container">

        {/* Page heading */}
        <h1 className={styles.heading}>Team</h1>

        {/* Member cards */}
        <div className={styles.list}>
          {members.map((m) => (
            <div key={m.name} className={styles.card}>
              <div className={styles.imgWrap}>
                <img src={m.img} alt={m.name} className={styles.img} />
              </div>
              <div className={styles.info}>
                <p className={styles.name}>
                  {m.name} <span className={styles.divider}>-</span> {m.title}
                </p>
                <p className={styles.bio}>{m.bio}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
