import { Header } from '@/components/navigation/Header/Header';
import { auth } from '@/libs/auth/auth';

interface Props {
  sideMenu?: React.ReactNode;
}

export async function HeaderContainer({ sideMenu }: Props) {
  const { isLoggedIn } = await auth();

  return <Header isLoggedIn={isLoggedIn} sideMenu={sideMenu} />;
}
