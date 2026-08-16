import { PRODUCTS } from '../data/site';
import type { Product } from '../data/site';

/**
 * Subdomain cards come from the admin dashboard once products exist in the
 * database. The hard-coded list in data/site.ts is the fallback, so the page
 * still renders if the API is down or empty.
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch('/api/products');
    if (!response.ok) return PRODUCTS;

    const rows = (await response.json()) as Product[];
    return Array.isArray(rows) && rows.length > 0 ? rows : PRODUCTS;
  } catch {
    return PRODUCTS;
  }
}
