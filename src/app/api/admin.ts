/** Admin API client. Same origin — the API is served by the same process. */

const TOKEN_KEY = 'sasusync.admin.token';

export type AdminProduct = {
  id: number;
  name: string;
  domain: string;
  href: string;
  body: string;
  status: string;
  tags: string[];
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type ProductInput = {
  name: string;
  domain: string;
  href: string;
  body: string;
  status: string;
  tags: string[];
  published: boolean;
  sort_order: number;
};

export type Enquiry = {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  delivered_to_telegram: boolean;
  delivery_error: string;
  created_at: string;
};

export function getToken(): string {
  return localStorage.getItem(TOKEN_KEY) ?? '';
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

/** Thrown with the server's own message so the UI can show it verbatim —
 *  the lockout warning ("1 attempt left") matters more than a generic error. */
export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((init.headers as Record<string, string>) ?? {}),
  };

  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(path, { ...init, headers });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = await response.json();
      if (typeof body?.detail === 'string') message = body.detail;
    } catch {
      /* non-JSON error body — keep the default */
    }
    throw new ApiError(response.status, message);
  }

  return response.status === 204 ? (undefined as T) : ((await response.json()) as T);
}

export async function login(email: string, password: string): Promise<void> {
  const data = await request<{ access_token: string }>('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  setToken(data.access_token);
}

export const listProducts = () => request<AdminProduct[]>('/api/admin/products');

export const createProduct = (data: ProductInput) =>
  request<AdminProduct>('/api/admin/products', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const updateProduct = (id: number, data: ProductInput) =>
  request<AdminProduct>(`/api/admin/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const deleteProduct = (id: number) =>
  request<void>(`/api/admin/products/${id}`, { method: 'DELETE' });

export const listEnquiries = () => request<Enquiry[]>('/api/admin/enquiries');
