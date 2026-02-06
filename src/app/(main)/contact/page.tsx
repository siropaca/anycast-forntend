import type { Metadata } from 'next';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { ContactForm } from '@/features/contact/components/ContactForm';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.contact.title,
};

export default function ContactPage() {
  return (
    <div className="space-y-6">
      <SectionTitle title={Pages.contact.title} />

      <p className="text-sm leading-relaxed text-text-subtle">
        Anycast
        に関するご質問、不具合の報告、機能のリクエストなどがございましたら、以下のフォームよりお問い合わせください。
      </p>

      <ContactForm />
    </div>
  );
}
