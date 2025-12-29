import type { Metadata } from 'next';
import { DashboardContent } from '@/features/studio/dashboard/ui/DashboardContent';

export const metadata: Metadata = {
  title: 'ダッシュボード',
  robots: { index: false },
};

export default function StudioDashboardPage() {
  return <DashboardContent />;
}
