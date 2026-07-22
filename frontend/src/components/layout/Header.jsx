import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Search, Sparkles, Phone, User, ShoppingCart, Menu, ChevronDown } from 'lucide-react';
import styles from './Header.module.css';

const navItems = [
  { label: 'Shop All', path: '/products', hasDropdown: false },
  { label: 'BSP Fittings', path: '/products?category=bsp-fittings', hasDropdown: false },
  { label: 'Containers', path: '/products?category=containers', hasDropdown: false },
  { label: 'Home Brew', path: '/products?category=home-brew-products', hasDropdown: false },
  { label: 'Taps', path: '/products?category=taps', hasDropdown: false },
  { label: 'Pourers', path: '/products?category=pourers', hasDropdown: false },
  { label: 'Special Products', path: '/products?category=special-products', hasDropdown: false },
];

export default function Header() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/products?search=${encodeURIComponent(search.trim())}`);
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.main}>
          <Link to="/" className={styles.logo}>
            <img src="/logo.png" alt="Beneficial Plastics" className={styles.logoImg} />
            <div className={styles.logoText}>
              <strong>BENEFICIAL</strong>
              <span>PLASTICS</span>
            </div>
          </Link>

          <form className={styles.searchBox} onSubmit={handleSearch}>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="What are you looking for today?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className={styles.searchBtn}>
              <Sparkles size={14} /> AI Search
            </button>
          </form>

          <div className={styles.actions}>
            <span className={styles.phone}><Phone size={15} /> +61 3 9357 0569</span>
            <Link to="/account" className={styles.iconBtn}><User size={20} /></Link>
            <Link to="/cart" className={styles.iconBtn}>
              <ShoppingCart size={20} />
              <span className={styles.cartBadge}>0</span>
            </Link>
            <button className={styles.menuBtn}><Menu size={22} /></button>
          </div>
        </div>
      </div>

      <nav className={styles.nav}>
        <div className="container">
          <div className={styles.navInner}>
            <ul className={styles.navLinks}>
              {navItems.map((item) => (
                <li key={item.label} className={styles.navItem}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `${styles.navLink}${isActive ? ' ' + styles.active : ''}`}
                  >
                    {item.label}
                    {item.hasDropdown && <ChevronDown size={13} />}
                  </NavLink>
                </li>
              ))}
            </ul>
            <Link to="/request-quote" className={styles.quoteBtn}>Request Quote</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
