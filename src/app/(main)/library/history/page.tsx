import type { Metadata } from 'next';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.library.history.title,
};

export default function LibraryHistoryPage() {
  return <div>Library History</div>;
}
