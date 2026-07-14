import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus, X } from 'lucide-react';

import './NeuralLandingPage.css';

export default function NeuralLandingPage() {
  const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
  const [contactOpen, setContactOpen] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <>
    <div className="layout-container">
      <motion.nav
        className="navbar"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: customEase }}
      >
        <div className="nav-left">
          <div className="logo-container">
            <svg className="logo-svg" width="20" height="20" viewBox="0 0 24 24">
              <rect x="3" y="6" width="7" height="12" rx="2" fill="black" />
              <rect x="14" y="6" width="7" height="12" rx="2" fill="black" />
            </svg>
            <span className="brand-text">SasuSync</span>
          </div>

          <div className="pill-menu">
            <div className="plus-circle">
              <Plus size={12} strokeWidth={3} />
            </div>
            <span className="menu-text">Menu</span>
          </div>

          <div className="pill-tags">
            <span>Multi-Tenancy</span>
            <span style={{ opacity: 0.3 }}>/</span>
            <span>Isolated Architecture</span>
          </div>
        </div>

        <div className="nav-right">
          <div className="pill-adaptive">
            <span className="adaptive-text">Engine Health 100%</span>
            <div className="grid-circle">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="5" cy="5" r="3" />
                <circle cx="19" cy="5" r="3" />
                <circle cx="5" cy="19" r="3" />
                <circle cx="19" cy="19" r="3" />
              </svg>
            </div>
          </div>
        </div>
      </motion.nav>

      <motion.div
        className="video-wrapper"
        style={{ x: '-50%', y: '-50%' }}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: customEase }}
      >
        <video
          className="bg-video"
          autoPlay
          muted
          playsInline
          loop
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4"
        />
      </motion.div>

      <motion.footer
        className="footer-wrapper"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: customEase }}
      >
        <div className="footer-left">
          <motion.div
            className="subtitle-line"
            initial={{ y: 16, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: customEase }}
          >
            <div className="dot" />
            <span>Next-Gen Infrastructure Optimization 2026</span>
          </motion.div>

          <motion.h1
            className="main-heading"
            initial={{ y: 20, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: customEase }}
          >
            Synchronize Your Stack.
            <br />
            Zero Limits. Private VPS.
          </motion.h1>

          <motion.div
            className="btn-group"
            initial={{ y: 16, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: customEase }}
          >
            <button className="btn-primary" onClick={() => { setSent(false); setContactOpen(true); }}>Get in touch</button>
            <button className="btn-secondary">Read Docs</button>
          </motion.div>
        </div>

        <div className="footer-right">
          <span className="tag-pill">PostgreSQL Engine</span>
          <span className="tag-pill">Docker-Ready</span>
          <span className="tag-pill">Edge Sync</span>
        </div>
      </motion.footer>
    </div>

    {/* ============ PRODUCT SECTIONS ============ */}

    {/* Features */}
    <section className="section" id="features">
      <motion.p
        className="eyebrow"
        initial={{ y: 16, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: customEase }}
      >
        <span className="dot" /> What SasuSync does
      </motion.p>

      <motion.h2
        className="section-heading"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: 0.05, ease: customEase }}
      >
        Infrastructure that syncs itself,<br />so you can ship.
      </motion.h2>

      <div className="feature-grid">
        {FEATURES.map((f, i) => (
          <motion.div
            className="feature-card"
            key={f.title}
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: customEase }}
          >
            <div className="feature-icon">{f.icon}</div>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-body">{f.body}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* How it works */}
    <section className="section section-dark" id="how">
      <motion.p
        className="eyebrow eyebrow-light"
        initial={{ y: 16, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: customEase }}
      >
        <span className="dot dot-light" /> From insight to launch
      </motion.p>

      <motion.h2
        className="section-heading"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: 0.05, ease: customEase }}
      >
        Three steps to a synced stack.
      </motion.h2>

      <div className="steps">
        {STEPS.map((s, i) => (
          <motion.div
            className="step"
            key={s.title}
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: customEase }}
          >
            <span className="step-num">0{i + 1}</span>
            <div>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-body">{s.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="section cta" id="start">
      <motion.h2
        className="cta-heading"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: customEase }}
      >
        Ready to synchronize your stack?
      </motion.h2>
      <motion.div
        className="btn-group"
        initial={{ y: 16, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: 0.1, ease: customEase }}
      >
        <button className="btn-primary" onClick={() => { setSent(false); setContactOpen(true); }}>Get in touch</button>
        <button className="btn-secondary">Read Docs</button>
      </motion.div>

      <div className="contact-links">
        {CONTACTS.map((c) => (
          <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="tag-pill contact-pill">
            {c.label}
          </a>
        ))}
      </div>
    </section>

    {/* Site footer */}
    <footer className="site-footer">
      <div className="logo-container">
        <svg className="logo-svg" width="20" height="20" viewBox="0 0 24 24">
          <rect x="3" y="6" width="7" height="12" rx="2" fill="black" />
          <rect x="14" y="6" width="7" height="12" rx="2" fill="black" />
        </svg>
        <span className="brand-text-static">SasuSync</span>
      </div>
      <p className="footer-note">
        A SasuLabs product by{' '}
        <a href="https://sasu.sasulabs.me" target="_blank" rel="noreferrer">Sasu Isaac Osafo</a>.
        © {new Date().getFullYear()}
      </p>
    </footer>

    {/* Contact modal */}
    <AnimatePresence>
      {contactOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => setContactOpen(false)}
        >
          <motion.div
            className="modal-card"
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: customEase }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setContactOpen(false)} aria-label="Close">
              <X size={16} />
            </button>

            <p className="eyebrow"><span className="dot" /> Let’s build together</p>
            <h3 className="modal-heading">Get in touch</h3>

            <form
              className="contact-form"
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: wire backend later
                setSent(true);
              }}
            >
              <label className="field">
                <span>Your name</span>
                <input type="text" name="name" placeholder="Jane Doe" required />
              </label>
              <label className="field">
                <span>Your email</span>
                <input type="email" name="email" placeholder="you@example.com" required />
              </label>
              <label className="field">
                <span>Phone number</span>
                <input type="tel" name="phone" placeholder="+233 XXX XXX XXX" />
              </label>
              <label className="field">
                <span>Subject (optional)</span>
                <input type="text" name="subject" placeholder="Project inquiry" />
              </label>
              <label className="field">
                <span>Message</span>
                <textarea name="message" rows={4} placeholder="Tell me about your project or idea…" required />
              </label>

              {sent ? (
                <p className="form-success">Thanks — your message is captured. Backend delivery coming soon.</p>
              ) : (
                <button type="submit" className="btn-primary modal-submit">Send Message</button>
              )}
            </form>

            <div className="modal-contacts">
              {CONTACTS.map((c) => (
                <a key={c.label} href={c.href} target="_blank" rel="noreferrer">{c.label}</a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

const CONTACTS = [
  { label: 'Email', href: 'mailto:sasuisaac332@gmail.com' },
  { label: 'WhatsApp', href: 'https://wa.me/233201142183' },
  { label: 'GitHub', href: 'https://github.com/sasusavage' },
  { label: 'X', href: 'https://x.com/sasu_savagee' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/isaac-sasu-56787133a' },
];

const FEATURES = [
  {
    icon: '◈',
    title: 'Multi-tenant by design',
    body: 'Isolated architecture per tenant — data, config, and compute stay cleanly separated with zero cross-talk.',
  },
  {
    icon: '⇄',
    title: 'Edge sync engine',
    body: 'Changes propagate to the edge in real time. Your stack stays consistent across regions without manual orchestration.',
  },
  {
    icon: '◱',
    title: 'PostgreSQL core',
    body: 'A battle-tested Postgres engine underneath, tuned for resilient reads and writes at scale.',
  },
  {
    icon: '⬡',
    title: 'Docker-ready',
    body: 'Ships as a container. Deploy to any VPS or cloud in minutes with the bundled Dockerfile and nginx config.',
  },
];

const STEPS = [
  {
    title: 'Connect your sources',
    body: 'Point SasuSync at your databases and services. It maps your topology automatically.',
  },
  {
    title: 'Define your sync rules',
    body: 'Declare what stays in sync and how. Tenancy, regions, and consistency are all yours to shape.',
  },
  {
    title: 'Launch and watch it hum',
    body: 'Deploy the container and SasuSync keeps everything synchronized — engine health at 100%.',
  },
];