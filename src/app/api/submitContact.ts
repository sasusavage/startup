/**
 * The single seam between the site and the backend.
 *
 * No credentials live here. The browser posts to our own API, and the backend
 * holds the Telegram token and chat id — anything referenced in this file ends
 * up readable in the shipped bundle.
 */

const ENDPOINT = '/api/contact';

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  /** Honeypot — must stay empty. Real people never see this field. */
  website: string;
};

export type ContactResult = {
  ok: boolean;
  /** False when we stored the enquiry but Telegram delivery failed. */
  delivered: boolean;
};

export async function submitContact(data: ContactPayload): Promise<ContactResult> {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(detail ? `${response.status}: ${detail.slice(0, 140)}` : `${response.status}`);
  }

  return (await response.json()) as ContactResult;
}
