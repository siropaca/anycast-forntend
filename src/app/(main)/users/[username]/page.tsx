import type { Metadata } from 'next';
import { UserDetail } from '@/features/users/components/UserDetail';
import { Pages } from '@/libs/pages';
import type { UserParams } from '@/libs/pages/mainPages';

interface Props {
  params: Promise<UserParams>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;

  return {
    title: Pages.user.title(resolvedParams),
  };
}

export default async function UserPage({ params }: Props) {
  const { username } = await params;

  return <UserDetail username={username} />;
}
