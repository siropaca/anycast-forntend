import { Sidebar } from '@/components/navigation/Sidebar';
import { MainLayoutSideMenu } from '@/features/app/components/MainLayoutSideMenu';
import { auth } from '@/libs/auth/auth';

interface Props {
  children: React.ReactNode;
}

export async function MainLayout({ children }: Props) {
  const { isLoggedIn } = await auth();

  return (
    <div className="flex flex-1">
      <Sidebar>
        <MainLayoutSideMenu isLoggedIn={isLoggedIn} />
      </Sidebar>

      <main className="flex-1 p-4 pt-0 flex">
        <div className="overflow-y-auto bg-surface rounded-md grow p-4">
          {children}
        </div>
      </main>
    </div>
  );
}
