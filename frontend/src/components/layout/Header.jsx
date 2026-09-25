import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Sparkles, Phone, User, ShoppingCart, Menu, ChevronDown, X } from 'lucide-react';
import { useCategories } from '../../hooks/useCategories';
import styles from './Header.module.css';

const FALLBACK_CATEGORIES = [
  { slug: 'bsp-fittings',       name: 'BSP Fittings' },
  { slug: 'containers',         name: 'Containers' },
  { slug: 'home-brew-products', name: 'Home Brew Products' },
  { slug: 'pourers',            name: 'Pourers' },
  { slug: 'taps',               name: 'Taps' },
  { slug: 'special-products',   name: 'Special Products' },
];

const staticNavItems = [
  { label: 'Industries', hash: 'industries' },
  { label: 'Contact Us', hash: 'contact' },
];

// Scroll to a section by id, offset for sticky header
function scrollToId(id, headerHeight) {
  const target = document.getElementById(id);
  if (!target) return false;
  const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
  window.scrollTo({ top, behavior: 'smooth' });
  return true;
}

export default function Header() {
  const [search, setSearch]         = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropOpen, setDropOpen]     = useState(false);
  const navigate   = useNavigate();
  const location   = useLocation();

  const { data } = useCategories();
  const categories = data?.data?.length ? data.data : FALLBACK_CATEGORIES;

  const dropRef   = useRef(null);
  const headerRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // After navigating back to '/', scroll to the pending hash
  useEffect(() => {
    if (location.pathname !== '/') return;
    const pending = sessionStorage.getItem('scrollTo');
    if (!pending) return;
    sessionStorage.removeItem('scrollTo');
    // Wait for the home page to render
    const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0;
    const attempt = (tries = 0) => {
      if (scrollToId(pending, headerHeight)) return;
      if (tries < 15) setTimeout(() => attempt(tries + 1), 80);
    };
    setTimeout(() => attempt(), 100);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/products?search=${encodeURIComponent(search.trim())}`);
  };

  const handleNavClick = (e, hash) => {
    e.preventDefault();
    setMobileOpen(false);
    setDropOpen(false);
    const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0;

    if (location.pathname === '/') {
      // Already on home — scroll directly
      scrollToId(hash, headerHeight);
    } else {
      // On another page — store hash, navigate home, then scroll via useEffect
      sessionStorage.setItem('scrollTo', hash);
      navigate('/');
    }
  };

  return (
    <header ref={headerRef} className={styles.header}>
      <div className="container">
        <div className={styles.main}>

          {/* LOGO */}
          <Link to="/" className={styles.logo}>
            <img src="/logo.png" alt="Beneficial Plastics" className={styles.logoImg} />
            <div className={styles.logoText}>
              <strong>BENEFICIAL</strong>
              <span>PLASTICS</span>
            </div>
          </Link>

          {/* SEARCH */}
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

          {/* ACTIONS */}
          <div className={styles.actions}>
            <span className={styles.phone}><Phone size={15} /> +61 3 9357 0569</span>
            <Link to="/account" className={styles.iconBtn} aria-label="Account"><User size={20} /></Link>
            <Link to="/cart" className={styles.iconBtn} aria-label="Cart">
              <ShoppingCart size={20} />
              <span className={styles.cartBadge}>0</span>
            </Link>
            <button
              className={styles.menuBtn}
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* NAV */}
      <nav className={`${styles.nav} ${mobileOpen ? styles.navOpen : ''}`}>
        <div className="container">
          <div className={styles.navInner}>
            <ul className={styles.navLinks}>

              {/* Home */}
              <li className={styles.navItem}>
                <a
                  href="/"
                  className={styles.navLink}
                  onClick={(e) => handleNavClick(e, 'home')}
                >
                  Home
                </a>
              </li>

              {/* About Us */}
              <li className={styles.navItem}>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `${styles.navLink}${isActive ? ` ${styles.navLinkActive}` : ''}`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  About Us
                </NavLink>
              </li>

              {/* Products with dropdown */}
              <li
                className={`${styles.navItem} ${styles.hasDropdown}`}
                ref={dropRef}
                onMouseEnter={() => setDropOpen(true)}
                onMouseLeave={() => setDropOpen(false)}
              >
                <button
                  className={`${styles.navLink} ${styles.navLinkBtn} ${dropOpen ? styles.navLinkActive : ''}`}
                  onClick={() => setDropOpen((v) => !v)}
                  aria-haspopup="true"
                  aria-expanded={dropOpen}
                >
                  Products
                  <ChevronDown
                    size={13}
                    className={`${styles.chevron} ${dropOpen ? styles.chevronUp : ''}`}
                  />
                </button>

                {dropOpen && (
                  <div className={styles.dropdown} role="menu">
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        to={`/products?category=${cat.slug}`}
                        className={styles.dropdownLink}
                        role="menuitem"
                        onClick={() => { setDropOpen(false); setMobileOpen(false); }}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              {/* Static nav items */}
              {staticNavItems.map((item) => (
                <li key={item.label} className={styles.navItem}>
                  <a
                    href={`/#${item.hash}`}
                    className={styles.navLink}
                    onClick={(e) => handleNavClick(e, item.hash)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <Link to="/request-quote" className={styles.quoteBtn} onClick={() => setMobileOpen(false)}>
              Request Quote
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className={styles.mobileOverlay} onClick={() => setMobileOpen(false)} />
      )}
    </header>
  );
}
