'use client';

import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';

interface Props {
  prompt?: string | null;
}

export function ScriptPromptSection({ prompt }: Props) {
  return (
    <div className="space-y-4">
      <SectionTitle title="台本プロンプト" level="h3" />
      <p className="whitespace-pre-wrap text-sm text-text-subtle">
        {prompt || '未設定'}
      </p>
    </div>
  );
}
