import PasswordRecovery from '@/components/sections/PasswordRecovery';

export const metadata = { title: 'Vaihda salasana', robots: { index: false, follow: false }, referrer: 'no-referrer' as const };

export default function ResetPasswordPage({ searchParams }: { searchParams: { token?: string | string[] } }) {
  return <PasswordRecovery token={typeof searchParams.token === 'string' ? searchParams.token : ''} />;
}
