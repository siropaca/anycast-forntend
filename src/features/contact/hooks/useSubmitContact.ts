import { useState } from 'react';
import { useSubmitFeedback } from '@/features/app/hooks/useSubmitFeedback';
import type { ContactInput } from '@/features/contact/schemas/contact';
import { CONTACT_CATEGORY_OPTIONS } from '@/features/contact/schemas/contact';

interface SubmitOptions {
  onSuccess?: () => void;
}

/**
 * カテゴリ値からラベルを取得する
 *
 * @param value - カテゴリの値
 * @returns カテゴリのラベル
 */
function getCategoryLabel(value: string): string {
  return (
    CONTACT_CATEGORY_OPTIONS.find((option) => option.value === value)?.label ??
    value
  );
}

/**
 * お問い合わせの送信に必要なデータと操作を提供する
 *
 * @returns 送信関数、送信中フラグ、送信済みフラグ、エラー、リセット関数
 */
export function useSubmitContact() {
  const { isSubmitting, error, submitFeedback } = useSubmitFeedback();
  const [isSubmitted, setIsSubmitted] = useState(false);

  /**
   * お問い合わせを送信する
   *
   * @param data - フォーム入力データ
   * @param options - オプション（成功時コールバック）
   */
  function submitContact(data: ContactInput, options?: SubmitOptions) {
    const categoryLabel = getCategoryLabel(data.category);
    const formattedContent = `【${categoryLabel}】\n${data.content}`;

    submitFeedback(
      { content: formattedContent },
      {
        onSuccess: () => {
          setIsSubmitted(true);
          options?.onSuccess?.();
        },
      },
    );
  }

  /**
   * 送信済み状態をリセットする
   */
  function reset() {
    setIsSubmitted(false);
  }

  return {
    isSubmitting,
    isSubmitted,
    error,

    submitContact,
    reset,
  };
}
