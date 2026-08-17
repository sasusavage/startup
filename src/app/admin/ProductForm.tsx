import { useState } from 'react';
import type { FormEvent } from 'react';

import type { AdminProduct, ProductInput } from '../api/admin';

const EMPTY: ProductInput = {
  name: '',
  domain: '',
  href: '',
  body: '',
  status: 'soon',
  tags: [],
  published: true,
  sort_order: 0,
};

type Props = {
  initial?: AdminProduct;
  onSave: (data: ProductInput) => Promise<void>;
  onCancel: () => void;
};

export default function ProductForm({ initial, onSave, onCancel }: Props) {
  const [values, setValues] = useState<ProductInput>(
    initial
      ? {
          name: initial.name,
          domain: initial.domain,
          href: initial.href,
          body: initial.body,
          status: initial.status,
          tags: initial.tags,
          published: initial.published,
          sort_order: initial.sort_order,
        }
      : EMPTY,
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  function set<K extends keyof ProductInput>(key: K, value: ProductInput[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      // Default the link to the domain so the common case needs no typing.
      await onSave({ ...values, href: values.href || `https://${values.domain}` });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not save.');
      setBusy(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="admin-form-grid">
        <label className="admin-field">
          <span>Name</span>
          <input
            required
            value={values.name}
            placeholder="SMS"
            onChange={(e) => set('name', e.target.value)}
          />
        </label>

        <label className="admin-field">
          <span>Subdomain</span>
          <input
            required
            value={values.domain}
            placeholder="sms.sasusync.com"
            onChange={(e) => set('domain', e.target.value)}
          />
        </label>
      </div>

      <label className="admin-field">
        <span>Link (defaults to https:// + subdomain)</span>
        <input
          value={values.href}
          placeholder="https://sms.sasusync.com"
          onChange={(e) => set('href', e.target.value)}
        />
      </label>

      <label className="admin-field">
        <span>Description</span>
        <textarea
          rows={3}
          value={values.body}
          placeholder="What this service does, in a sentence or two."
          onChange={(e) => set('body', e.target.value)}
        />
      </label>

      <label className="admin-field">
        <span>Tags (comma separated)</span>
        <input
          value={values.tags.join(', ')}
          placeholder="REST API, Bulk send, Delivery reports"
          onChange={(e) =>
            set(
              'tags',
              e.target.value
                .split(',')
                .map((tag) => tag.trim())
                .filter(Boolean),
            )
          }
        />
      </label>

      <div className="admin-form-grid">
        <label className="admin-field">
          <span>Status</span>
          <select value={values.status} onChange={(e) => set('status', e.target.value)}>
            <option value="live">Live</option>
            <option value="soon">Soon</option>
          </select>
        </label>

        <label className="admin-field">
          <span>Sort order</span>
          <input
            type="number"
            value={values.sort_order}
            onChange={(e) => set('sort_order', Number(e.target.value) || 0)}
          />
        </label>
      </div>

      <label className="admin-check">
        <input
          type="checkbox"
          checked={values.published}
          onChange={(e) => set('published', e.target.checked)}
        />
        <span>Show on the landing page</span>
      </label>

      {error && (
        <p className="admin-error" role="alert">
          {error}
        </p>
      )}

      <div className="admin-form-actions">
        <button type="submit" className="admin-btn" disabled={busy}>
          {busy ? 'Saving…' : 'Save'}
        </button>
        <button type="button" className="admin-btn-ghost" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
