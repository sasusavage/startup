import { ArrowUpRight } from 'lucide-react';

import Reveal from './Reveal';
import { PRODUCTS } from '../data/site';

export default function Products() {
  return (
    <section className="section" id="products">
      <Reveal>
        <p className="eyebrow">
          <span className="eyebrow-dot" />
          Ready to integrate
        </p>

        <h2 className="section-title">
          Services you can <span className="serif">plug in</span>
        </h2>

        <p className="section-lead">
          Live services running on their own subdomains. Point your system at one and go.
        </p>
      </Reveal>

      <div className="product-grid">
        {PRODUCTS.map((product, i) => (
          <Reveal className="product-cell" key={product.domain} delay={i * 0.06}>
            <a className="product-card" href={product.href} target="_blank" rel="noreferrer">
              <header className="product-head">
                <span className="product-name">{product.name}</span>
                <span className={product.status === 'live' ? 'status status-live' : 'status'}>
                  {product.status === 'live' ? 'Live' : 'Soon'}
                </span>
              </header>

              <p className="product-domain">
                {product.domain}
                <ArrowUpRight size={14} strokeWidth={2} />
              </p>

              <p className="product-body">{product.body}</p>

              <div className="product-tags">
                {product.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          </Reveal>
        ))}

        <Reveal className="product-cell" delay={PRODUCTS.length * 0.06}>
          <div className="product-card product-card-empty">
            <header className="product-head">
              <span className="product-name">More on the way</span>
            </header>
            <p className="product-body">
              We add a new integrable service whenever we build one worth sharing. Tell us what you
              need and it may be next.
            </p>
            <a className="link-underline" href="#contact">
              Request a service
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
