import { describe, expect, it } from 'vitest';
import { contactSchema } from '@/features/contact/schemas/contact';

describe('contactSchema', () => {
  const validInput = {
    category: 'bug',
    content: 'テスト内容',
  };

  it('有効な入力でパースが成功する', () => {
    const result = contactSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it('すべてのカテゴリでパースが成功する', () => {
    for (const category of ['bug', 'feature', 'account', 'other']) {
      const result = contactSchema.safeParse({ ...validInput, category });
      expect(result.success).toBe(true);
    }
  });

  it('無効なカテゴリの場合はエラー', () => {
    const input = { ...validInput, category: 'invalid' };
    const result = contactSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it('category が未指定の場合はエラー', () => {
    const { category: _, ...input } = validInput;
    const result = contactSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it('content が空の場合はエラー', () => {
    const input = { ...validInput, content: '' };
    const result = contactSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it('content が1000文字を超える場合はエラー', () => {
    const input = { ...validInput, content: 'あ'.repeat(1001) };
    const result = contactSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it('content が1000文字ちょうどの場合はパースが成功する', () => {
    const input = { ...validInput, content: 'あ'.repeat(1000) };
    const result = contactSchema.safeParse(input);
    expect(result.success).toBe(true);
  });
});
