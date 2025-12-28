import { StudioLayout } from '@/features/app/layouts/StudioLayout';

export default function StudioGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StudioLayout>{children}</StudioLayout>;
}
