import type { Metadata } from 'next';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.home.title,
};

export default function HomePage() {
  return <div>Home</div>;
}
