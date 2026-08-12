/**
 * The single seam between the site and wherever enquiries go.
 *
 * Today that's nginx proxying to the Telegram Bot API (see nginx.conf.template).
 * The bot token lives in nginx, never in this bundle — anything referenced here
 * ends up readable in the browser, so the token must not be.
 *
 * When the Python/PostgreSQL backend lands, only ENDPOINT and the body shape
 * below need to change. Nothing else on the site touches the network.
 */

const ENDPOINT = '/api/contact';

/** Not secret — a chat id is useless to anyone without the bot token. */
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID ?? '';

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

function formatMessage(data: ContactPayload): string {
  return [
    '🔔 New enquiry — sasusync.com',
    '',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : '',
    data.subject ? `Subject: ${data.subject}` : '',
    '',
    data.message,
  ]
    .filter(Boolean)
    .join('\n');
}

export async function submitContact(data: ContactPayload): Promise<void> {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: formatMessage(data),
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`Enquiry endpoint returned ${response.status}`);
  }
}
