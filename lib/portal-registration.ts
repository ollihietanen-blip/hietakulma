import { createHash } from 'crypto';

const DEFAULT_BLOCKED_DOMAINS = ['lapwall.fi', 'neco.fi', 'salvos.fi'];

export function normalizeEmail(value: unknown) {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

export function emailDomain(email: string) {
  return email.split('@').at(-1)?.toLowerCase() ?? '';
}

export function blockedPortalDomains() {
  const configured = process.env.PORTAL_BLOCKED_EMAIL_DOMAINS
    ?.split(',')
    .map((domain) => domain.trim().toLowerCase())
    .filter(Boolean);

  return configured?.length ? configured : DEFAULT_BLOCKED_DOMAINS;
}

export function isBlockedPortalEmail(email: string) {
  const domain = emailDomain(email);
  return blockedPortalDomains().some(
    (blockedDomain) => domain === blockedDomain || domain.endsWith(`.${blockedDomain}`),
  );
}

export function hashActivationToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

export function isStrongEnoughPassword(password: string) {
  return password.length >= 12 && Buffer.byteLength(password, 'utf8') <= 72;
}

export function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function isValidEmail(email: string) {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function portalBaseUrl() {
  const configured = process.env.NEXT_PUBLIC_APP_URL;
  if (!configured && process.env.NODE_ENV === 'production') {
    throw new Error('Portal application URL is missing.');
  }
  const url = new URL(configured || 'http://localhost:3000');
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password ||
      url.pathname !== '/' || url.search || url.hash ||
      (process.env.NODE_ENV === 'production' &&
        (url.protocol !== 'https:' || ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)))) {
    throw new Error('Portal application URL is invalid.');
  }
  return url.origin;
}
