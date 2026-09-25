import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, Phone, User, ShoppingCart, Menu, ChevronDown, X } from 'lucide-react';
import styles from './Header.module.css';

// ── NAV STRUCTURE ─────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'About Us',
    path: '/about',
    children: [
      { label: 'Team', path: '/about/team' },
    ],
  },
  {
    label: 'Services',
    path: '/services',
    children: [
      { label: 'Tooling Services',          path: '/services/tooling' },
      { label: 'Injection Moulding Services', path: '/services/injection-moulding' },
      { label: '3D Printing',               path: '/services/3d-printing' },
    ],
  },
  {
    label: 'Containers',
    path: '/products?category=containers',
    children: [
      { label: '54 Litre Industrial Bin Only',      path: '/products/54-litre-industrial-bin' },
      { label: '44 Litre Industrial Bin & Lid',     path: '/products/44-litre-industrial-bin-lid' },
      { label: 'Handy Case',                         path: '/products/handy-case' },
    ],
  },
  {
    label: 'BSP Fittings',
    path: '/products?category=bsp-fittings',
    children: [
      { label: 'BSP Bung Cap',                          path: '/products/bsp-bung-cap' },
      { label: 'BSP Adaptor Washer Set',                path: '/products/bsp-adaptor-washer-set' },
      { label: 'BSP Adaptor',                           path: '/products/bsp-adaptor' },
      { label: 'BSP Washer',                            path: '/products/bsp-washer' },
      { label: 'Camlock Adaptor, Cap and Washer Set',   path: '/products/camlock-adaptor-cap-washer-set' },
      { label: 'Camlock Adaptor',                       path: '/products/camlock-adaptor' },
      { label: 'Camlock Bung Cap',                      path: '/products/camlock-bung-cap' },
      { label: 'Camlock Washer',                        path: '/products/camlock-washer' },
    ],
  },
  {
    label: 'Home Brew Products',
    path: '/products?category=home-brew-products',
    children: [
      { label: 'Bottle Draining Tree',          path: '/products/bottle-draining-tree' },
      { label: 'Snap Tap - Standard',           path: '/products/snap-tap-standard' },
      { label: 'Snap Tap - Female',             path: '/products/snap-tap-female' },
      { label: 'Snap Tap - 44mm Long Thread',   path: '/products/snap-tap-44mm-long-thread' },
      { label: 'Snap Tap - 3/4 BSP',            path: '/products/snap-tap-34-bsp' },
      { label: 'Push Button Tap',               path: '/products/push-button-tap' },
      { label: 'Snap Tap - Box',                path: '/products/snap-tap-box' },
    ],
  },
  {
    label: 'Taps',
    path: '/products?category=taps',
    children: [
      { label: 'Snap Tap - Standard',           path: '/products/snap-tap-standard' },
      { label: 'Snap Tap - Female',             path: '/products/snap-tap-female' },
      { label: 'Snap Tap - 44mm Long Thread',   path: '/products/snap-tap-44mm-long-thread' },
      { label: 'Snap Tap - 3/4 BSP',            path: '/products/snap-tap-34-bsp' },
      { label: 'Push Button Tap',               path: '/products/push-button-tap' },
      { label: 'Snap Tap - Box',                path: '/products/snap-tap-box' },
      { label: 'Snap Tap Gold Plated',          path: '/products/snap-tap-gold-plated' },
      { label: 'Snap Tap Chrome Plated',        path: '/products/snap-tap-chrome-plated' },
      { label: '3/4" BSP Snap Tap (Header Card)', path: '/products/34-bsp-snap-tap-header-card' },
    ],
  },
  {
    label: 'Aussie Turbo Ripper',
    path: '/products?category=aussie-turbo-ripper',
    children: [
      { label: 'Straight Shaft Whipper Snipper Head', path: '/products/straight-shaft-whipper-snipper' },
      { label: 'Bent Shaft Whipper Snipper Head',     path: '/products/bent-shaft-whipper-snipper' },
      { label: 'Metal (Aluminium) Whipper Snipper Head', path: '/products/metal-whipper-snipper' },
      { label: 'Clip and Tube with 25 Star Cord',     path: '/products/clip-tube-25-star-cord' },
      { label: 'Clip and Tube',                        path: '/products/clip-and-tube' },
      { label: 'Star Cord (Trimming Cord) 1KG',        path: '/products/star-cord-1kg' },
      { label: 'Star Cord (Trimming Cord) Bundles',    path: '/products/star-cord-bundles' },
    ],
  },
  {
    label: 'Other Products',
    path: '/products?category=other',
    children: [
      { label: 'Pourers', path: '/products?category=pourers' },
    ],
  },
  {
    label: 'Order Form',
    path: '/order-form',
  },
];

// ── DROPDOWN ITEM ─────────────────────────────────────────────────────────────
function NavDropdownItem({ item, closeAll }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const timerRef = useRef(null);

  const openMenu  = () => { clearTimeout(timerRef.current); setOpen(true); };
  const closeMenu = () => { timerRef.current = setTimeout(() => setOpen(false), 120); };

  // Close on outside click
  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLinkClick = () => { setOpen(false); closeAll(); };

  return (
    <li
      ref={ref}
      className={`${styles.navItem} ${styles.hasDropdown}`}
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      {/* Label — clicking the text navigates to the parent path */}
      <Link
        to={item.path}
        className={`${styles.navLink} ${open ? styles.navLinkActive : ''}`}
        onClick={handleLinkClick}
      >
        {item.label}
        <ChevronDown
          size={12}
          className={`${styles.chevron} ${open ? styles.chevronUp : ''}`}
        />
      </Link>

      {open && (
        <ul className={styles.dropdown} role="menu">
          {item.children.map((child) => (
            <li key={child.path}>
              <Link
                to={child.path}
                className={styles.dropdownLink}
                role="menuitem"
                onClick={handleLinkClick}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

// ── HEADER ────────────────────────────────────────────────────────────────────
export default function Header() {
  const [search,     setSearch]     = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null); // tracks which mobile accordion is open
  const navigate  = useNavigate();
  const headerRef = useRef(null);

  const closeAll = useCallback(() => setMobileOpen(false), []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/products?search=${encodeURIComponent(search.trim())}`);
  };

  const toggleMobileAccordion = (label) =>
    setMobileExpanded((prev) => (prev === label ? null : label));

  return (
    <header ref={headerRef} className={styles.header}>
      <div className="container">
        <div className={styles.main}>

          {/* LOGO */}
          <Link to="/" className={styles.logo} onClick={closeAll}>
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

      {/* ── DESKTOP NAV ── */}
      <nav className={styles.nav} aria-label="Main navigation">
        <div className="container">
          <div className={styles.navInner}>
            <ul className={styles.navLinks}>
              {NAV_ITEMS.map((item) =>
                item.children ? (
                  <NavDropdownItem key={item.label} item={item} closeAll={closeAll} />
                ) : (
                  <li key={item.label} className={styles.navItem}>
                    <NavLink
                      to={item.path}
                      end={item.path === '/'}
                      className={({ isActive }) =>
                        `${styles.navLink}${isActive ? ` ${styles.navLinkActive}` : ''}`
                      }
                      onClick={closeAll}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                )
              )}
            </ul>

            <Link to="/request-quote" className={styles.quoteBtn} onClick={closeAll}>
              Request Quote
            </Link>
          </div>
        </div>
      </nav>

      {/* ── MOBILE NAV ── */}
      {mobileOpen && (
        <>
          <div className={styles.mobileOverlay} onClick={closeAll} />
          <nav className={styles.mobileNav} aria-label="Mobile navigation">
            <ul className={styles.mobileNavList}>
              {NAV_ITEMS.map((item) => (
                <li key={item.label} className={styles.mobileNavItem}>
                  {item.children ? (
                    <>
                      <button
                        className={styles.mobileNavBtn}
                        onClick={() => toggleMobileAccordion(item.label)}
                        aria-expanded={mobileExpanded === item.label}
                      >
                        {item.label}
                        <ChevronDown
                          size={14}
                          className={`${styles.chevron} ${mobileExpanded === item.label ? styles.chevronUp : ''}`}
                        />
                      </button>
                      {mobileExpanded === item.label && (
                        <ul className={styles.mobileSubList}>
                          {item.children.map((child) => (
                            <li key={child.path}>
                              <Link
                                to={child.path}
                                className={styles.mobileSubLink}
                                onClick={closeAll}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={styles.mobileNavLink}
                      onClick={closeAll}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <Link to="/request-quote" className={styles.mobileQuoteBtn} onClick={closeAll}>
                  Request Quote
                </Link>
              </li>
            </ul>
          </nav>
        </>
      )}
    </header>
  );
}
