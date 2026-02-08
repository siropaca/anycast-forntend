'use client';

import { UserIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import type { RefObject } from 'react';
import { FormLabel } from '@/components/dataDisplay/FormLabel/FormLabel';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { HelperText } from '@/components/inputs/Input/HelperText';

interface Props {
  previewUrl: string | undefined;
  fileInputRef: RefObject<HTMLInputElement | null>;
  isUploading: boolean;
  error: string | undefined;

  onOpenFilePicker: () => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}

export function AvatarImageField({
  previewUrl,
  fileInputRef,
  isUploading,
  error,
  onOpenFilePicker,
  onFileChange,
  onRemove,
}: Props) {
  return (
    <div className="space-y-2">
      <FormLabel>アバター画像</FormLabel>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="shrink-0 cursor-pointer"
          disabled={isUploading}
          onClick={onOpenFilePicker}
        >
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="アバター"
              width={80}
              height={80}
              className="size-20 rounded-full object-cover"
            />
          ) : (
            <div className="flex size-20 items-center justify-center rounded-full bg-bg-hover text-text-placeholder transition-colors hover:bg-bg-hover-strong">
              <UserIcon size={32} />
            </div>
          )}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileChange}
        />
        <div className="flex gap-2">
          <Button
            variant="outline"
            color="secondary"
            disabled={isUploading}
            onClick={onOpenFilePicker}
          >
            {isUploading
              ? 'アップロード中...'
              : previewUrl
                ? '画像を変更'
                : '画像を選択'}
          </Button>
          {previewUrl && (
            <Button
              variant="outline"
              color="secondary"
              disabled={isUploading}
              onClick={onRemove}
            >
              削除
            </Button>
          )}
        </div>
      </div>
      {error && <HelperText error>{error}</HelperText>}
    </div>
  );
}
