import Logo from './Logo';
import { CONTACTS } from '../data/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Logo className="footer-logo" />
        <span className="footer-wordmark">SasuSync</span>
      </div>

      <nav className="footer-links">
        {CONTACTS.map((contact) => (
          <a key={contact.label} href={contact.href} target="_blank" rel="noreferrer">
            {contact.label}
          </a>
        ))}
      </nav>

      <p className="footer-note">
        © {new Date().getFullYear()} SasuSync. Built by{' '}
        <a href="https://sasu.sasulabs.me" target="_blank" rel="noreferrer">
          Sasu Isaac Osafo
        </a>{' '}
        (snrvibecoder).
      </p>
    </footer>
  );
}
