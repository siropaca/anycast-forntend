import { MainLayout } from '@/features/app/layouts/MainLayout';

export default function MainGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
