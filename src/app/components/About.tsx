export default function About() {
  return (
    <section className="section" id="about">
      <div className="about">
        <div className="about-copy">
          <p className="eyebrow">
            <span className="eyebrow-dot" />
            Who we are
          </p>

          <h2 className="section-title">
            A small studio that <span className="serif">ships</span>
          </h2>

          <p className="section-lead about-lead">
            SasuSync is a web design and software studio. We design and develop websites, build SaaS
            products, customize the systems you already run, and keep all of it maintained after
            launch. Some of what we build becomes a service you can integrate directly.
          </p>
        </div>

        <dl className="about-facts">
          <div className="about-fact">
            <dt>Business</dt>
            <dd>Sole proprietorship</dd>
          </div>
          <div className="about-fact">
            <dt>Nature</dt>
            <dd>Services</dd>
          </div>
          <div className="about-fact">
            <dt>Focus</dt>
            <dd>Web, SaaS &amp; AI</dd>
          </div>
          <div className="about-fact">
            <dt>Based in</dt>
            <dd>Ghana, working remotely</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
