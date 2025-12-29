import type { Metadata } from 'next';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.library.following.title,
};

export default function LibraryFollowingPage() {
  return <div>Library Following</div>;
}
