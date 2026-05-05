import { Resend } from 'resend';
import type { ContactFormValues } from './validation';
import { SITE } from './constants';

let resendInstance: Resend | null = null;
function getResend(): Resend {
  if (!resendInstance) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error('RESEND_API_KEY is not set');
    resendInstance = new Resend(key);
  }
  return resendInstance;
}

const enquiryTypeLabel: Record<ContactFormValues['enquiryType'], string> = {
  'method-proposal': 'Method Proposal',
  'machine-hire': 'Machine Hire / Availability',
  guidance: 'Not sure — needs guidance',
};

export async function sendContactEmail(data: ContactFormValues) {
  const from = process.env.FROM_EMAIL || `GNAT UK Website <noreply@gnatuk.com>`;
  const to = process.env.CONTACT_EMAIL || SITE.email;
  const bcc = process.env.BCC_EMAIL ? [process.env.BCC_EMAIL] : undefined;

  const subject = `New ${enquiryTypeLabel[data.enquiryType]}${
    data.company ? ` — ${data.company}` : ''
  }`;

  const submitted = new Date().toISOString();

  const text = `New enquiry from gnatuk.com

ENQUIRY TYPE: ${enquiryTypeLabel[data.enquiryType]}
SERVICE: ${data.service || '—'}
NAME: ${data.name}
COMPANY: ${data.company || '—'}
EMAIL: ${data.email}
PHONE: ${data.phone || '—'}

MESSAGE:
${data.message}

—
SUBMITTED: ${submitted}
`;

  const html = `<!DOCTYPE html>
<html>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1a2332; line-height: 1.5; max-width: 640px; margin: 0 auto; padding: 24px;">
    <h2 style="color: #1a2332; border-bottom: 2px solid #ff6b35; padding-bottom: 8px;">New enquiry from gnatuk.com</h2>
    <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
      <tr><td style="padding: 6px 0; color: #5a6470; width: 140px;">Enquiry type</td><td style="padding: 6px 0; font-weight: 600;">${enquiryTypeLabel[data.enquiryType]}</td></tr>
      <tr><td style="padding: 6px 0; color: #5a6470;">Service</td><td style="padding: 6px 0;">${data.service || '—'}</td></tr>
      <tr><td style="padding: 6px 0; color: #5a6470;">Name</td><td style="padding: 6px 0;">${escapeHtml(data.name)}</td></tr>
      <tr><td style="padding: 6px 0; color: #5a6470;">Company</td><td style="padding: 6px 0;">${escapeHtml(data.company || '—')}</td></tr>
      <tr><td style="padding: 6px 0; color: #5a6470;">Email</td><td style="padding: 6px 0;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
      <tr><td style="padding: 6px 0; color: #5a6470;">Phone</td><td style="padding: 6px 0;">${data.phone ? `<a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a>` : '—'}</td></tr>
    </table>
    <h3 style="color: #1a2332; margin-top: 24px;">Message</h3>
    <div style="white-space: pre-wrap; padding: 16px; background: #f5f6f8; border-left: 3px solid #ff6b35;">${escapeHtml(data.message)}</div>
    <p style="color: #8b95a0; font-size: 12px; margin-top: 24px;">Submitted ${submitted}</p>
  </body>
</html>`;

  return getResend().emails.send({
    from,
    to,
    bcc,
    replyTo: data.email,
    subject,
    text,
    html,
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
