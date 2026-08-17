import { useState } from 'react';
import type { FormEvent } from 'react';

import Logo from '../components/Logo';
import { ApiError, login } from '../api/admin';

export default function Login({ onDone }: { onDone: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [locked, setLocked] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');

    try {
      await login(email, password);
      onDone();
    } catch (caught) {
      // 429 is the lockout. Its message carries the remaining time.
      setLocked(caught instanceof ApiError && caught.status === 429);
      setError(caught instanceof Error ? caught.message : 'Login failed.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-login">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <Logo className="admin-login-logo" />
        <h1 className="admin-login-title">SasuSync admin</h1>

        <label className="admin-field">
          <span>Email</span>
          <input
            type="email"
            required
            value={email}
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="admin-field">
          <span>Password</span>
          <input
            type="password"
            required
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {error && (
          <p className={locked ? 'admin-error admin-error-locked' : 'admin-error'} role="alert">
            {error}
            {locked && (
              <span className="admin-error-hint">
                The lockout is held in memory — redeploying the app in Coolify clears it.
              </span>
            )}
          </p>
        )}

        <button type="submit" className="admin-btn" disabled={busy || locked}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>

        <p className="admin-login-note">
          Two wrong attempts locks this address out for 72 hours.
        </p>
      </form>
    </div>
  );
}
