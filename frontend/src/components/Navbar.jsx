
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import "./Navbar.css";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "About", path: "/about" },
  { label: "Blog", path: "/blog" },
  { label: "Careers", path: "/careers" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <Link to="/" className="brand" onClick={closeMenu}>
        <span className="brand-mark">R</span>
        <span className="brand-name">
          RIYADVI<span>TECHNOLOGIES</span>
        </span>
      </Link>

      <nav className="desktop-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Link to="/contact" className="nav-cta desktop-cta">
        Let's Talk <ArrowUpRight size={17} />
      </Link>

      <button
        className="mobile-menu"
        type="button"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={25} /> : <Menu size={25} />}
      </button>

      {menuOpen && (
        <nav className="mobile-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? "active" : ""}`
              }
              onClick={closeMenu}
            >
              {item.label}
            </NavLink>
          ))}

          <Link to="/contact" className="nav-cta mobile-cta" onClick={closeMenu}>
            Let's Talk <ArrowUpRight size={17} />
          </Link>
        </nav>
      )}
    </header>
  );
}
