import type { Metadata } from 'next';
import { UserPromptForm } from '@/features/studio/settings/components/UserPromptForm';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.studio.settings.title,
  robots: { index: false },
};

export default function StudioSettingsPage() {
  return (
    <div>
      <UserPromptForm />
    </div>
  );
}
