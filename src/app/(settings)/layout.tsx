import { SettingsLayout } from '@/features/app/layouts/SettingsLayout';

export default function SettingsGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SettingsLayout>{children}</SettingsLayout>;
}
