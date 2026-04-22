/**
 * URL sanitization utilities to prevent XSS attacks via javascript: protocol URLs.
 * All user-supplied URLs rendered as `href` attributes MUST pass through sanitizeUrl().
 */

const SAFE_URL_PROTOCOLS = ['http:', 'https:', 'mailto:'];

/**
 * Sanitizes a URL to prevent XSS via javascript:, data:, or other dangerous protocols.
 * Only allows http://, https://, mailto:, and anchor (#) links.
 * Returns '#' for any invalid or dangerous URL.
 */
export function sanitizeUrl(url: string | undefined | null): string {
  if (!url) return '#'

  const trimmed = url.trim()

  // Allow empty strings and anchor links
  if (trimmed === '' || trimmed.startsWith('#')) return trimmed

  // Allow relative URLs starting with /
  if (trimmed.startsWith('/')) return trimmed

  try {
    const parsed = new URL(trimmed)
    if (SAFE_URL_PROTOCOLS.includes(parsed.protocol)) {
      return trimmed
    }
  } catch {
    // If URL parsing fails, it might be a relative URL or invalid
    // Only allow if it doesn't contain a colon (protocol indicator)
    if (!trimmed.includes(':')) {
      return trimmed
    }
  }

  // Block everything else (javascript:, data:, vbscript:, etc.)
  return '#'
}

/**
 * Sanitizes an href specifically for use in <a> tags.
 * Returns '#' for any dangerous URL and adds rel="noopener noreferrer" recommendation.
 */
export function sanitizeHref(url: string | undefined | null): string {
  return sanitizeUrl(url)
}

/**
 * Checks if a URL is an external link (not a hash or relative URL).
 * Useful for adding target="_blank" and rel="noopener noreferrer".
 */
export function isExternalUrl(url: string | undefined | null): boolean {
  if (!url) return false
  const trimmed = url.trim()
  return trimmed.startsWith('http://') || trimmed.startsWith('https://')
}
