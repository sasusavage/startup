/**
 * Single source of truth for the landing page copy.
 *
 * PRODUCTS is the seam for the admin dashboard: once the Python/PostgreSQL
 * backend exists, the admin uploads a subdomain + its details and this array
 * gets fetched instead of hard-coded. Shape stays the same either way.
 */

export type Service = {
  title: string;
  body: string;
};

export type Product = {
  name: string;
  domain: string;
  href: string;
  body: string;
  status: 'live' | 'soon';
  /** Short capability chips shown under the description. */
  tags: string[];
};

export type Contact = {
  label: string;
  href: string;
};

export const SERVICES: Service[] = [
  {
    title: 'Web design & UI/UX',
    body: 'Interfaces designed for the phone first, then scaled up — clear, fast, and built to feel effortless.',
  },
  {
    title: 'Full-stack development',
    body: 'Python and Flask on the back, modern JavaScript on the front. One team for the whole build.',
  },
  {
    title: 'Backend & APIs',
    body: 'Resilient services, REST APIs, webhooks and database design that hold up under real traffic.',
  },
  {
    title: 'AI development',
    body: 'LLM-powered assistants, research tools and automations wired into the systems you already run.',
  },
  {
    title: 'Commerce & booking',
    body: 'Storefronts with cart and checkout, scheduling systems with real-time availability, payments included.',
  },
  {
    title: 'Maintenance',
    body: 'Updates, backups, uptime monitoring and fixes — we stay on long after launch day.',
  },
];

export const PRODUCTS: Product[] = [
  {
    name: 'SMS',
    domain: 'sms.sasusync.com',
    href: 'https://sms.sasusync.com',
    body: 'Send transactional and bulk SMS straight from your app. One API key, simple REST endpoints, delivery reports included.',
    status: 'live',
    tags: ['REST API', 'Bulk send', 'Delivery reports'],
  },
];

export const CONTACTS: Contact[] = [
  { label: 'Email', href: 'mailto:sasuisaac332@gmail.com' },
  { label: 'WhatsApp', href: 'https://wa.me/233201142183' },
  { label: 'Call', href: 'tel:+233201142183' },
  { label: 'GitHub', href: 'https://github.com/sasusavage' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/isaac-sasu-56787133a' },
  { label: 'X', href: 'https://x.com/sasu_savagee' },
  { label: 'Instagram', href: 'https://www.instagram.com/i.o.sasu' },
];
