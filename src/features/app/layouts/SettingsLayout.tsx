import { Sidebar } from '@/components/navigation/Sidebar';
import { SettingsLayoutSideMenu } from '@/features/app/components/SettingsLayoutSideMenu';

interface Props {
  children: React.ReactNode;
}

export function SettingsLayout({ children }: Props) {
  return (
    <div className="flex flex-1">
      <Sidebar>
        <SettingsLayoutSideMenu />
      </Sidebar>

      <main className="flex-1 p-4 pt-0 flex">
        <div className="overflow-y-auto bg-surface rounded-md grow p-4">
          {children}
        </div>
      </main>
    </div>
  );
}
