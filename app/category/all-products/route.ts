// Legacy Wix product-category index. Returning 410 (Gone) tells Google to
// drop this URL from the index cleanly — better than a generic 404 (which
// Google retries) or a misleading redirect to somewhere unrelated.
export const dynamic = 'force-static';

export function GET() {
  return new Response(null, { status: 410 });
}
