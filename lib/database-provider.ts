export function databaseProvider(env: Record<string, string | undefined>): 'sqlite' | 'postgresql' {
  const provider = env.PORTAL_DATABASE_PROVIDER || (env.VERCEL === '1' ? 'postgresql' : 'sqlite');
  if (provider !== 'sqlite' && provider !== 'postgresql') throw new Error('Invalid PORTAL_DATABASE_PROVIDER.');
  if (env.VERCEL === '1' && provider !== 'postgresql') throw new Error('Vercel requires PostgreSQL for persistent portal data.');
  return provider;
}
