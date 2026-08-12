import ContactForm from './ContactForm';
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

        <ContactForm />

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
