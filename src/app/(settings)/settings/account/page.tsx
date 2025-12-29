import type { Metadata } from 'next';
import { AccountContent } from '@/features/settings/account/ui/AccountContent';

export const metadata: Metadata = {
  title: 'アカウント',
  robots: { index: false },
};

export default function SettingsAccountPage() {
  return <AccountContent />;
}
