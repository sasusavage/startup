import { useCallback, useEffect, useState } from 'react';

import Logo from '../components/Logo';
import ProductForm from './ProductForm';
import {
  clearToken,
  createProduct,
  deleteProduct,
  listEnquiries,
  listProducts,
  updateProduct,
} from '../api/admin';
import type { AdminProduct, Enquiry, ProductInput } from '../api/admin';

type Tab = 'products' | 'enquiries';

function formatDate(iso: string): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? iso : date.toLocaleString();
}

export default function Dashboard({ onSignOut }: { onSignOut: () => void }) {
  const [tab, setTab] = useState<Tab>('products');
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [editing, setEditing] = useState<AdminProduct | 'new' | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const signOut = useCallback(() => {
    clearToken();
    onSignOut();
  }, [onSignOut]);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [nextProducts, nextEnquiries] = await Promise.all([listProducts(), listEnquiries()]);
      setProducts(nextProducts);
      setEnquiries(nextEnquiries);
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : 'Could not load data.';
      // An expired or invalid token means the session is over.
      if (message.toLowerCase().includes('token') || message.includes('401')) {
        signOut();
        return;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [signOut]);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleSave(data: ProductInput) {
    if (editing && editing !== 'new') {
      await updateProduct(editing.id, data);
    } else {
      await createProduct(data);
    }
    setEditing(null);
    await load();
  }

  async function handleDelete(product: AdminProduct) {
    if (!window.confirm(`Delete ${product.domain}? This cannot be undone.`)) return;
    try {
      await deleteProduct(product.id);
      await load();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not delete.');
    }
  }

  return (
    <div className="admin">
      <header className="admin-header">
        <div className="admin-brand">
          <Logo className="admin-logo" />
          <span>SasuSync admin</span>
        </div>

        <nav className="admin-tabs">
          <button
            className={tab === 'products' ? 'admin-tab admin-tab-active' : 'admin-tab'}
            onClick={() => setTab('products')}
          >
            Services ({products.length})
          </button>
          <button
            className={tab === 'enquiries' ? 'admin-tab admin-tab-active' : 'admin-tab'}
            onClick={() => setTab('enquiries')}
          >
            Enquiries ({enquiries.length})
          </button>
        </nav>

        <div className="admin-header-actions">
          <a className="admin-btn-ghost" href="/">
            View site
          </a>
          <button className="admin-btn-ghost" onClick={signOut}>
            Sign out
          </button>
        </div>
      </header>

      <main className="admin-main">
        {error && (
          <p className="admin-error" role="alert">
            {error}
          </p>
        )}

        {loading && <p className="admin-muted">Loading…</p>}

        {!loading && tab === 'products' && (
          <section>
            <div className="admin-section-head">
              <h2>Subdomain services</h2>
              {!editing && (
                <button className="admin-btn" onClick={() => setEditing('new')}>
                  Add service
                </button>
              )}
            </div>

            <p className="admin-muted">
              Anything published here appears on the landing page straight away.
            </p>

            {editing ? (
              <ProductForm
                initial={editing === 'new' ? undefined : editing}
                onSave={handleSave}
                onCancel={() => setEditing(null)}
              />
            ) : products.length === 0 ? (
              <p className="admin-empty">No services yet. Add your first one.</p>
            ) : (
              <ul className="admin-list">
                {products.map((product) => (
                  <li className="admin-row" key={product.id}>
                    <div className="admin-row-main">
                      <div className="admin-row-title">
                        {product.name}
                        <span
                          className={
                            product.status === 'live'
                              ? 'admin-badge admin-badge-live'
                              : 'admin-badge'
                          }
                        >
                          {product.status}
                        </span>
                        {!product.published && <span className="admin-badge">hidden</span>}
                      </div>
                      <div className="admin-row-sub">{product.domain}</div>
                      {product.body && <p className="admin-row-body">{product.body}</p>}
                    </div>

                    <div className="admin-row-actions">
                      <button className="admin-btn-ghost" onClick={() => setEditing(product)}>
                        Edit
                      </button>
                      <button
                        className="admin-btn-ghost admin-btn-danger"
                        onClick={() => handleDelete(product)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {!loading && tab === 'enquiries' && (
          <section>
            <div className="admin-section-head">
              <h2>Contact form enquiries</h2>
              <button className="admin-btn-ghost" onClick={() => void load()}>
                Refresh
              </button>
            </div>

            {enquiries.length === 0 ? (
              <p className="admin-empty">Nothing yet.</p>
            ) : (
              <ul className="admin-list">
                {enquiries.map((item) => (
                  <li className="admin-row admin-row-stack" key={item.id}>
                    <div className="admin-row-title">
                      {item.name}
                      {!item.delivered_to_telegram && (
                        <span
                          className="admin-badge admin-badge-warn"
                          title={item.delivery_error}
                        >
                          not delivered
                        </span>
                      )}
                    </div>
                    <div className="admin-row-sub">
                      <a href={`mailto:${item.email}`}>{item.email}</a>
                      {item.phone && ` · ${item.phone}`} · {formatDate(item.created_at)}
                    </div>
                    {item.subject && <div className="admin-row-sub">Re: {item.subject}</div>}
                    <p className="admin-row-body admin-row-message">{item.message}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
