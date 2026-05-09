import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validation';
import { sendAutoReply, sendContactEmail } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: 'Email service is not configured. Please contact us directly.' },
      { status: 503 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Please check the form for errors.',
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  // Honeypot — silently succeed for bots
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  const limit = rateLimit(`contact:${ip}`, 5, 60 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many submissions. Please try again later or call us directly.' },
      {
        status: 429,
        headers: limit.retryAfter ? { 'Retry-After': String(limit.retryAfter) } : undefined,
      },
    );
  }

  try {
    const result = await sendContactEmail(parsed.data);
    if (result.error) {
      console.error('Resend error:', result.error);
      return NextResponse.json(
        { error: 'We could not send your enquiry. Please try again or call us directly.' },
        { status: 502 },
      );
    }

    // Auto-reply to the lead. Failure here must not block the success response —
    // the internal notification already landed and the team has the lead.
    try {
      const auto = await sendAutoReply(parsed.data);
      if (auto.error) console.error('Auto-reply error:', auto.error);
    } catch (autoErr) {
      console.error('Auto-reply threw:', autoErr);
    }

    return NextResponse.json({ ok: true, id: result.data?.id });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or call us directly.' },
      { status: 500 },
    );
  }
}
