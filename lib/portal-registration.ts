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
  return password.length >= 12;
}

export function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
