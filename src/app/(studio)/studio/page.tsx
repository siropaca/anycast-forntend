import type { Metadata } from 'next';
import { DashboardContent } from '@/features/studio/dashboard/ui/DashboardContent';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.studio.index.title,
  robots: { index: false },
};

export default function StudioPage() {
  return <DashboardContent />;
}
