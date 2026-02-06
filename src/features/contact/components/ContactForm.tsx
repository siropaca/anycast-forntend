'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircleIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormLabel } from '@/components/dataDisplay/FormLabel/FormLabel';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { Checkbox } from '@/components/inputs/Checkbox/Checkbox';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { Select } from '@/components/inputs/Select/Select';
import { Textarea } from '@/components/inputs/Textarea/Textarea';
import { useSubmitContact } from '@/features/contact/hooks/useSubmitContact';
import type { ContactInput } from '@/features/contact/schemas/contact';
import {
  CONTACT_CATEGORY_OPTIONS,
  contactSchema,
} from '@/features/contact/schemas/contact';
import { Pages } from '@/libs/pages';

export function ContactForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
    defaultValues: { content: '' },
  });

  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);

  const { isSubmitting, isSubmitted, error, submitContact } =
    useSubmitContact();

  function handleAgreedChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAgreedToPrivacy(event.target.checked);
  }

  function onSubmit(data: ContactInput) {
    if (!agreedToPrivacy) return;
    submitContact(data);
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-md border border-border bg-bg-surface p-8 text-center">
        <CheckCircleIcon size={48} weight="fill" className="text-green" />
        <p className="text-lg font-semibold">お問い合わせを受け付けました</p>
        <p className="text-sm text-text-subtle">
          内容を確認のうえ、必要に応じてご連絡いたします。
        </p>
        <div className="mt-4">
          <Button variant="outline" size="md" href={Pages.home.path()}>
            ホームへ戻る
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* カテゴリ */}
      <div className="space-y-2">
        <FormLabel htmlFor="contact-category" required>
          カテゴリ
        </FormLabel>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select
              options={[...CONTACT_CATEGORY_OPTIONS]}
              value={field.value ?? null}
              onValueChange={(value) => field.onChange(value)}
              placeholder="選択してください"
              size="lg"
              error={!!errors.category}
              className="w-full"
            />
          )}
        />
        {errors.category && (
          <HelperText error>{errors.category.message}</HelperText>
        )}
      </div>

      {/* お問い合わせ内容 */}
      <div className="space-y-2">
        <FormLabel htmlFor="contact-content" required>
          お問い合わせ内容
        </FormLabel>
        <Textarea
          id="contact-content"
          rows={12}
          placeholder="お問い合わせ内容を詳しくお聞かせください"
          error={!!errors.content}
          {...register('content')}
        />
        {errors.content && (
          <HelperText error>{errors.content.message}</HelperText>
        )}
      </div>

      {/* 注意文 */}
      <p className="text-xs leading-relaxed text-text-subtle">
        氏名、住所、メールアドレス、電話番号、パスワードなどの個人情報はお問い合わせ内容に含めないでください。
      </p>

      {/* プライバシーポリシー同意 */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="agree-privacy"
          checked={agreedToPrivacy}
          onChange={handleAgreedChange}
        />
        <label
          htmlFor="agree-privacy"
          className="cursor-pointer text-sm text-text-subtle"
        >
          <Link
            href={Pages.privacy.path()}
            target="_blank"
            className="text-text-link hover:underline"
          >
            プライバシーポリシー
          </Link>
          に同意する
        </label>
      </div>

      {/* エラー */}
      {error && (
        <HelperText error className="mb-4">
          {error}
        </HelperText>
      )}

      {/* 送信ボタン */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={!isValid || !agreedToPrivacy}
        disabledReason="すべての項目を入力し、プライバシーポリシーに同意してください"
        loading={isSubmitting}
      >
        送信
      </Button>
    </form>
  );
}
