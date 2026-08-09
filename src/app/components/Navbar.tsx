import { useState } from 'react';
import { ChevronDown, ChevronRight, Mail, Menu } from 'lucide-react';
import { motion } from 'motion/react';

import Logo from './Logo';
import { EASE } from '../motion';

type NavItem = {
  label: string;
  href: string;
  /** The active page marker. */
  dot?: boolean;
  /** Renders orange with a chevron — the subdomain products menu. */
  accent?: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home', dot: true },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products', accent: true },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="nav-wrapper"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <nav className="nav-pill">
        <a className="nav-brand" href="#home" aria-label="SasuSync home">
          <Logo className="nav-logo" />
          <span className="nav-wordmark">SasuSync</span>
        </a>

        <div className="nav-links">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={item.accent ? 'nav-link nav-link-accent' : 'nav-link'}
            >
              {item.dot && <span className="nav-dot" />}
              {item.label}
              {item.accent && <ChevronDown size={14} strokeWidth={2} />}
            </a>
          ))}
        </div>

        <div className="nav-right">
          <a className="nav-icon-btn" href="mailto:sasuisaac332@gmail.com" aria-label="Email SasuSync">
            <Mail size={18} strokeWidth={1.75} />
          </a>

          <a className="nav-cta" href="#contact">
            <span className="nav-cta-long">Start a project</span>
            <span className="nav-cta-short">Start</span>
            <span className="nav-cta-chevron">
              <ChevronRight size={14} strokeWidth={2.5} />
            </span>
          </a>

          <button
            type="button"
            className="nav-hamburger"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Menu size={20} strokeWidth={2} />
          </button>
        </div>

        {open && (
          <div className="nav-menu">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={item.accent ? 'nav-menu-link nav-link-accent' : 'nav-menu-link'}
                onClick={() => setOpen(false)}
              >
                {item.dot && <span className="nav-dot" />}
                {item.label}
                {item.accent && <ChevronDown size={14} strokeWidth={2} />}
              </a>
            ))}
          </div>
        )}
      </nav>
    </motion.div>
  );
}
