import Reveal from './Reveal';

const FACTS = [
  { term: 'Led by', value: 'Sasu Isaac Osafo' },
  { term: 'Core stack', value: 'Python, Flask, React' },
  { term: 'Focus', value: 'Backend, AI & UI/UX' },
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
            SasuSync is the studio of Sasu Isaac Osafo — a full-stack developer and UI/UX designer
            working out of Ghana. The work runs from resilient Python backends and REST APIs to the
            interface sitting on top of them: online stores, booking systems, AI research tools.
          </p>

          <p className="section-lead about-lead">
            Same hands design it and build it, which is why it ships. Some of what we build becomes
            a service you can plug straight into your own system.
          </p>

          <a
            className="link-underline about-link"
            href="https://sasu.sasulabs.me"
            target="_blank"
            rel="noreferrer"
          >
            See the work behind it
          </a>
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
