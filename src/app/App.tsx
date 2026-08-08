import { ChevronRight } from 'lucide-react';

import About from './components/About';
import Contact from './components/Contact';
import DashboardPreview from './components/DashboardPreview';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Services from './components/Services';

export default function App() {
  return (
    <main className="page">
      {/* Nav, copy and dashboard share one rounded clip, so the cards bleed
          off the bottom edge of the hero. */}
      <section className="hero" id="home">
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

      <Services />
      <Products />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
