import { motion } from 'motion/react';
import { Plus } from 'lucide-react';

import './NeuralLandingPage.css';

export default function NeuralLandingPage() {
  const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
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
            <button className="btn-primary">Launch App</button>
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
  );
}