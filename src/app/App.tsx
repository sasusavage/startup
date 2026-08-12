import { ChevronRight } from 'lucide-react';
import { MotionConfig, motion } from 'motion/react';

import About from './components/About';
import Contact from './components/Contact';
import DashboardPreview from './components/DashboardPreview';
import Footer from './components/Footer';
import HeroOrbs from './components/HeroOrbs';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Services from './components/Services';
import { EASE, fadeUp, stagger } from './motion';
import { QuoteProvider } from './QuoteContext';

export default function App() {
  return (
    // reducedMotion="user" makes every motion component below respect the
    // viewer's OS "reduce motion" setting without extra wiring.
    <MotionConfig reducedMotion="user" transition={{ duration: 0.6, ease: EASE }}>
      <QuoteProvider>
        <main className="page">
          {/* Nav, copy and dashboard share one rounded clip, so the cards bleed
              off the bottom edge of the hero. */}
          <section className="hero" id="home">
            <HeroOrbs />

            <div className="hero-inner">
              <Navbar />

              <motion.div
                className="hero-content"
                variants={stagger}
                initial="hidden"
                animate="visible"
              >
                <motion.span className="badge" variants={fadeUp}>
                  <span className="badge-dot" />
                  SasuSync
                </motion.span>

                <motion.h1 className="hero-title" variants={fadeUp}>
                  Building <span className="hero-title-serif">software</span>
                  <br />
                  of tomorrow
                </motion.h1>

                <motion.p className="hero-subtitle" variants={fadeUp}>
                  Websites, SaaS and AI integrations, built and maintained for you
                </motion.p>

                <motion.a className="hero-cta" href="#contact" variants={fadeUp}>
                  Get Started
                  <span className="hero-cta-chevron">
                    <ChevronRight size={16} strokeWidth={2.5} />
                  </span>
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
              >
                <DashboardPreview />
              </motion.div>
            </div>
          </section>

          <Services />
          <Products />
          <About />
          <Contact />
          <Footer />
        </main>
      </QuoteProvider>
    </MotionConfig>
  );
}
