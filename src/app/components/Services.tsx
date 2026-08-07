import { SERVICES } from '../data/site';

export default function Services() {
  return (
    <section className="section" id="services">
      <p className="eyebrow">
        <span className="eyebrow-dot" />
        What we do
      </p>

      <h2 className="section-title">
        Design, build, <span className="serif">maintain</span>
      </h2>

      <p className="section-lead">
        Everything from a first landing page to a full product — and we stay on after launch.
      </p>

      <div className="service-grid">
        {SERVICES.map((service) => (
          <article className="service-card" key={service.title}>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-body">{service.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
