// Legacy Wix path flagged as obsolete in the site-migration review. 410
// (Gone) rather than 404 so Google drops the URL from the index instead
// of periodically retrying it.
export const dynamic = 'force-static';

export function GET() {
  return new Response(null, { status: 410 });
}
