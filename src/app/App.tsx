import { ChevronRight } from 'lucide-react';

import DashboardPreview from './components/DashboardPreview';
import Navbar from './components/Navbar';

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4';

export default function App() {
  return (
    <main className="page">
      {/* Video, nav, copy and dashboard all share one rounded clip, so the
          cards bleed off the bottom edge of the hero. */}
      <section className="hero" id="home">
        <video className="hero-video" src={HERO_VIDEO} autoPlay muted playsInline loop />

        <div className="hero-inner">
          <Navbar />

          <div className="hero-content">
            <span className="badge">
              <span className="badge-dot" />
              SasuSync
            </span>

            <h1 className="hero-title">
              Building <span className="hero-title-serif">software</span>
              <br />
              of tomorrow
            </h1>

            <p className="hero-subtitle">
              Websites, SaaS and AI integrations, built and maintained for you
            </p>

            <a className="hero-cta" href="#contact">
              Get Started
              <span className="hero-cta-chevron">
                <ChevronRight size={16} strokeWidth={2.5} />
              </span>
            </a>
          </div>

          <DashboardPreview />
        </div>
      </section>
    </main>
  );
}
