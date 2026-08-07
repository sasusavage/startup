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
    title: 'Web design',
    body: 'Interfaces designed for the phone first, then scaled up to desktop.',
  },
  {
    title: 'Web development',
    body: 'Fast, accessible sites and web apps, built to hold up over time.',
  },
  {
    title: 'Maintenance',
    body: 'Updates, backups, uptime monitoring and fixes — handled for you.',
  },
  {
    title: 'SaaS products',
    body: 'We build and ship your product end to end, from database to billing.',
  },
  {
    title: 'Customization',
    body: 'Already have a system? We extend, integrate and reshape it around you.',
  },
  {
    title: 'AI integrations',
    body: 'Assistants, automations and AI features wired into your existing stack.',
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
  { label: 'GitHub', href: 'https://github.com/sasusavage' },
  { label: 'X', href: 'https://x.com/sasu_savagee' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/isaac-sasu-56787133a' },
];
