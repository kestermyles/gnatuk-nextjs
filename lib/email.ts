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

// Parse a comma-separated env var (e.g. "nick@x,marc@x") into a clean string[].
function parseList(value: string | undefined): string[] | undefined {
  if (!value) return undefined;
  const items = value.split(',').map((s) => s.trim()).filter(Boolean);
  return items.length ? items : undefined;
}

const enquiryTypeLabel: Record<ContactFormValues['enquiryType'], string> = {
  'method-proposal': 'Method Proposal',
  'machine-hire': 'Machine Hire / Availability',
  guidance: 'Not sure — needs guidance',
};

export async function sendContactEmail(data: ContactFormValues) {
  const from = process.env.FROM_EMAIL || `GNAT UK Website <noreply@gnatuk.com>`;
  const to = parseList(process.env.CONTACT_EMAIL) ?? [SITE.email];
  const cc = parseList(process.env.CC_EMAIL);
  const bcc = parseList(process.env.BCC_EMAIL);

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
    cc,
    bcc,
    replyTo: data.email,
    subject,
    text,
    html,
  });
}

export async function sendAutoReply(data: ContactFormValues) {
  const from = process.env.FROM_EMAIL || `GNAT UK Website <noreply@gnatuk.com>`;
  const replyTo = parseList(process.env.CONTACT_EMAIL) ?? [SITE.email];

  const subject = `We've received your enquiry — ${SITE.name}`;
  const firstName = data.name.split(' ')[0] || data.name;

  const text = `Hi ${firstName},

Thanks for getting in touch with ${SITE.name}.

We've received your enquiry and a member of our team will be in contact within 24 hours.

If you need to speak to someone urgently, call us on ${SITE.phoneDisplay}.

Best regards,
${SITE.name}
${SITE.tagline}
${SITE.phoneDisplay}
${SITE.email}
${SITE.url}
`;

  const html = `<!DOCTYPE html>
<html>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1a2332; line-height: 1.6; max-width: 640px; margin: 0 auto; padding: 24px;">
    <p style="margin: 0 0 16px;">Hi ${escapeHtml(firstName)},</p>
    <p style="margin: 0 0 16px;">Thanks for getting in touch with <strong>${SITE.name}</strong>.</p>
    <p style="margin: 0 0 16px;">We've received your enquiry and a member of our team will be in contact within 24 hours.</p>
    <p style="margin: 0 0 24px;">If you need to speak to someone urgently, call us on <a href="tel:${SITE.phoneE164}" style="color: #ff6b35; text-decoration: none; font-weight: 600;">${SITE.phoneDisplay}</a>.</p>
    <hr style="border: none; border-top: 1px solid #e8eaed; margin: 24px 0;" />
    <p style="margin: 0; color: #5a6470; font-size: 14px;">
      <strong style="color: #1a2332;">${SITE.name}</strong><br />
      ${SITE.tagline}<br />
      <a href="tel:${SITE.phoneE164}" style="color: #5a6470; text-decoration: none;">${SITE.phoneDisplay}</a> &middot;
      <a href="mailto:${SITE.email}" style="color: #5a6470; text-decoration: none;">${SITE.email}</a><br />
      <a href="${SITE.url}" style="color: #5a6470; text-decoration: none;">${SITE.url}</a>
    </p>
  </body>
</html>`;

  return getResend().emails.send({
    from,
    to: data.email,
    replyTo,
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
