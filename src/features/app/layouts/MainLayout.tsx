import { Sidebar } from '@/features/app/ui/Sidebar';

interface Props {
  children: React.ReactNode;
}

export function MainLayout({ children }: Props) {
  return (
    <div className="flex min-h-[calc(100vh-57px)]">
      <Sidebar>
        <nav className="p-4">Sidebar</nav>
      </Sidebar>

      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
