import Reveal from './Reveal';

const FACTS = [
  { term: 'Business', value: 'Sole proprietorship' },
  { term: 'Nature', value: 'Services' },
  { term: 'Focus', value: 'Web, SaaS & AI' },
  { term: 'Based in', value: 'Ghana, working remotely' },
];

export default function About() {
  return (
    <section className="section" id="about">
      <div className="about">
        <Reveal className="about-copy">
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
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="about-facts">
            {FACTS.map((fact) => (
              <div className="about-fact" key={fact.term}>
                <dt>{fact.term}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
