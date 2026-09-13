// Temporary review access approved by Olli. Remove when email activation is ready.
// Both conditions are required: a production deployment always requires login.
export function isOpenPortalPreview(env: NodeJS.ProcessEnv = process.env): boolean {
  return env.VERCEL_ENV === 'preview'
    && env.VERCEL_GIT_COMMIT_REF === 'codex/julkaisuvalmistelu';
}
