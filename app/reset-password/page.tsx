import PasswordRecovery from '@/components/sections/PasswordRecovery';

export const metadata = { title: 'Vaihda salasana', robots: { index: false, follow: false }, referrer: 'no-referrer' as const };

export default async function ResetPasswordPage(props: { searchParams: Promise<{ token?: string | string[] }> }) {
  const searchParams = await props.searchParams;
  return <PasswordRecovery token={typeof searchParams.token === 'string' ? searchParams.token : ''} />;
}
