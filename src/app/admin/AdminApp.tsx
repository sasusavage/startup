import { useState } from 'react';

import Dashboard from './Dashboard';
import Login from './Login';
import { getToken } from '../api/admin';

export default function AdminApp() {
  const [signedIn, setSignedIn] = useState(() => Boolean(getToken()));

  return signedIn ? (
    <Dashboard onSignOut={() => setSignedIn(false)} />
  ) : (
    <Login onDone={() => setSignedIn(true)} />
  );
}
