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

// Format a timestamp for UK readers (e.g. "9 May 2026, 10:42 BST").
function formatUKTimestamp(d: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(d);
}

export async function sendContactEmail(data: ContactFormValues) {
  const from = process.env.FROM_EMAIL || `GNAT UK Website <noreply@gnatuk.com>`;
  const to = parseList(process.env.CONTACT_EMAIL) ?? [SITE.email];
  const cc = parseList(process.env.CC_EMAIL);
  const bcc = parseList(process.env.BCC_EMAIL);

  const subject = `[Website enquiry] ${enquiryTypeLabel[data.enquiryType]}${
    data.service ? ` — ${data.service}` : ''
  }${data.company ? ` — ${data.company}` : ''}`;

  const submitted = formatUKTimestamp(new Date());

  const text = `New enquiry from gnatuk.com

AT A GLANCE
${data.name}${data.company ? ` (${data.company})` : ''} — ${enquiryTypeLabel[data.enquiryType]}${
    data.service ? `, interested in ${data.service}` : ''
  }
Reply directly to ${data.email}${data.phone ? ` or call ${data.phone}` : ''}.

— DETAIL —
Enquiry type:  ${enquiryTypeLabel[data.enquiryType]}
Service:       ${data.service || '—'}
Name:          ${data.name}
Company:       ${data.company || '—'}
Email:         ${data.email}
Phone:         ${data.phone || '—'}

Their message:
${data.message}

—
Submitted ${submitted}
Hit Reply on this email to respond directly to ${data.name.split(' ')[0] || data.name} (Reply-To is set to their email).
`;

  const html = `<!DOCTYPE html>
<html>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1a2332; line-height: 1.5; max-width: 640px; margin: 0 auto; padding: 24px;">
    <h2 style="color: #1a2332; border-bottom: 2px solid #ff6b35; padding-bottom: 8px; margin: 0 0 20px;">New enquiry from gnatuk.com</h2>

    <div style="background: #fff7f1; border-left: 3px solid #ff6b35; padding: 14px 16px; margin: 0 0 24px; border-radius: 0 4px 4px 0;">
      <p style="margin: 0 0 6px; font-weight: 600; color: #1a2332;">At a glance</p>
      <p style="margin: 0; color: #1a2332; font-size: 15px;">
        <strong>${escapeHtml(data.name)}</strong>${data.company ? ` (${escapeHtml(data.company)})` : ''}
        — ${enquiryTypeLabel[data.enquiryType]}${data.service ? `, interested in <strong>${escapeHtml(data.service)}</strong>` : ''}.
      </p>
      <p style="margin: 8px 0 0; color: #5a6470; font-size: 14px;">
        Reply directly to <a href="mailto:${escapeHtml(data.email)}" style="color: #ff6b35; text-decoration: none; font-weight: 600;">${escapeHtml(data.email)}</a>${
          data.phone
            ? ` or call <a href="tel:${escapeHtml(data.phone)}" style="color: #ff6b35; text-decoration: none; font-weight: 600;">${escapeHtml(data.phone)}</a>`
            : ''
        }.
      </p>
    </div>

    <h3 style="color: #1a2332; margin: 0 0 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.06em; color: #5a6470;">Detail</h3>
    <table style="width: 100%; border-collapse: collapse; margin: 0 0 24px;">
      <tr><td style="padding: 6px 0; color: #5a6470; width: 140px;">Enquiry type</td><td style="padding: 6px 0; font-weight: 600;">${enquiryTypeLabel[data.enquiryType]}</td></tr>
      <tr><td style="padding: 6px 0; color: #5a6470;">Service</td><td style="padding: 6px 0;">${escapeHtml(data.service || '—')}</td></tr>
      <tr><td style="padding: 6px 0; color: #5a6470;">Name</td><td style="padding: 6px 0;">${escapeHtml(data.name)}</td></tr>
      <tr><td style="padding: 6px 0; color: #5a6470;">Company</td><td style="padding: 6px 0;">${escapeHtml(data.company || '—')}</td></tr>
      <tr><td style="padding: 6px 0; color: #5a6470;">Email</td><td style="padding: 6px 0;"><a href="mailto:${escapeHtml(data.email)}" style="color: #1a2332;">${escapeHtml(data.email)}</a></td></tr>
      <tr><td style="padding: 6px 0; color: #5a6470;">Phone</td><td style="padding: 6px 0;">${data.phone ? `<a href="tel:${escapeHtml(data.phone)}" style="color: #1a2332;">${escapeHtml(data.phone)}</a>` : '—'}</td></tr>
    </table>

    <h3 style="color: #1a2332; margin: 0 0 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.06em; color: #5a6470;">Their message</h3>
    <div style="white-space: pre-wrap; padding: 16px; background: #f5f6f8; border-left: 3px solid #ff6b35; border-radius: 0 4px 4px 0;">${escapeHtml(data.message)}</div>

    <p style="color: #8b95a0; font-size: 12px; margin-top: 24px; padding-top: 16px; border-top: 1px solid #e8eaed;">
      Submitted ${submitted}.<br />
      Hit Reply on this email to respond directly — Reply-To is set to ${escapeHtml(data.email)}.
    </p>
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

  // Truncate the echoed message for the auto-reply so it stays scannable.
  const echoLimit = 600;
  const echoedMessage =
    data.message.length > echoLimit
      ? `${data.message.slice(0, echoLimit).trimEnd()}…`
      : data.message;

  const text = `Hi ${firstName},

Thanks for getting in touch with ${SITE.name}.

A quick summary of what you sent us:
  Enquiry type:    ${enquiryTypeLabel[data.enquiryType]}
  Service:         ${data.service || '—'}
  Your message:    ${echoedMessage.split('\n').join('\n                   ')}

A member of our team will review the detail and come back to you within 24 hours. If you need to speak to someone urgently, call us on ${SITE.phoneDisplay}.

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

    <div style="background: #f5f6f8; border-left: 3px solid #ff6b35; padding: 16px 18px; margin: 0 0 20px; border-radius: 0 4px 4px 0;">
      <p style="margin: 0 0 12px; font-weight: 600; color: #1a2332;">A quick summary of what you sent us</p>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 4px 12px 4px 0; color: #5a6470; vertical-align: top; width: 110px;">Enquiry type</td>
          <td style="padding: 4px 0; color: #1a2332;">${enquiryTypeLabel[data.enquiryType]}</td>
        </tr>
        <tr>
          <td style="padding: 4px 12px 4px 0; color: #5a6470; vertical-align: top;">Service</td>
          <td style="padding: 4px 0; color: #1a2332;">${escapeHtml(data.service || '—')}</td>
        </tr>
        <tr>
          <td style="padding: 4px 12px 4px 0; color: #5a6470; vertical-align: top;">Your message</td>
          <td style="padding: 4px 0; color: #1a2332; white-space: pre-wrap;">${escapeHtml(echoedMessage)}</td>
        </tr>
      </table>
    </div>

    <p style="margin: 0 0 16px;">A member of our team will review the detail and come back to you within 24 hours.</p>
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
