import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { ChevronRight, Loader2 } from 'lucide-react';

import { submitContact } from '../api/submitContact';
import { useQuote } from '../QuoteContext';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const EMPTY = { name: '', email: '', phone: '', subject: '', message: '' };

export default function ContactForm() {
  const { prefill } = useQuote();
  const [values, setValues] = useState(EMPTY);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  // The hero's quote card drops its selections straight into the message.
  useEffect(() => {
    if (prefill) {
      setValues((current) => ({ ...current, message: prefill }));
    }
  }, [prefill]);

  function update(field: keyof typeof EMPTY, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (status === 'error') setStatus('idle');
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setError('');

    try {
      await submitContact(values);
      setStatus('sent');
      setValues(EMPTY);
    } catch (caught) {
      setStatus('error');
      setError(caught instanceof Error ? caught.message : 'Something went wrong.');
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-success" role="status">
        <p className="form-success-title">Message sent.</p>
        <p className="form-success-body">
          It landed in our Telegram — we usually reply within a day.
        </p>
        <button type="button" className="link-underline" onClick={() => setStatus('idle')}>
          Send another
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate={false}>
      <div className="form-row">
        <label className="form-field">
          <span>Your name</span>
          <input
            type="text"
            required
            value={values.name}
            autoComplete="name"
            placeholder="Jane Doe"
            onChange={(e) => update('name', e.target.value)}
          />
        </label>

        <label className="form-field">
          <span>Your email</span>
          <input
            type="email"
            required
            value={values.email}
            autoComplete="email"
            placeholder="you@example.com"
            onChange={(e) => update('email', e.target.value)}
          />
        </label>
      </div>

      <div className="form-row">
        <label className="form-field">
          <span>Phone (optional)</span>
          <input
            type="tel"
            value={values.phone}
            autoComplete="tel"
            placeholder="+233 XXX XXX XXX"
            onChange={(e) => update('phone', e.target.value)}
          />
        </label>

        <label className="form-field">
          <span>Subject (optional)</span>
          <input
            type="text"
            value={values.subject}
            placeholder="Project enquiry"
            onChange={(e) => update('subject', e.target.value)}
          />
        </label>
      </div>

      <label className="form-field">
        <span>Message</span>
        <textarea
          rows={5}
          required
          value={values.message}
          placeholder="Tell us about your project or idea…"
          onChange={(e) => update('message', e.target.value)}
        />
      </label>

      {status === 'error' && (
        <p className="form-error" role="alert">
          Couldn&apos;t send that — {error}. Try again, or email us directly at{' '}
          <a href="mailto:sasuisaac332@gmail.com">sasuisaac332@gmail.com</a>.
        </p>
      )}

      <button type="submit" className="form-submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send message'}
        <span className="form-submit-icon">
          {status === 'sending' ? (
            <Loader2 size={16} strokeWidth={2.5} className="spin" />
          ) : (
            <ChevronRight size={16} strokeWidth={2.5} />
          )}
        </span>
      </button>
    </form>
  );
}
