import { ChevronRight } from 'lucide-react';

import Reveal from './Reveal';
import { CONTACTS } from '../data/site';

export default function Contact() {
  return (
    <section className="section" id="contact">
      <Reveal className="contact-panel">
        <h2 className="contact-title">
          Got something to <span className="serif">build</span>?
        </h2>

        <p className="contact-lead">
          Tell us what you have in mind. We&apos;ll come back with a plan and a price.
        </p>

        <a className="contact-cta" href="mailto:sasuisaac332@gmail.com">
          Start a project
          <span className="contact-cta-chevron">
            <ChevronRight size={16} strokeWidth={2.5} />
          </span>
        </a>

        <div className="contact-links">
          {CONTACTS.map((contact) => (
            <a key={contact.label} href={contact.href} target="_blank" rel="noreferrer">
              {contact.label}
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
