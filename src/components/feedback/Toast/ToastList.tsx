'use client';

import { Toast } from '@base-ui/react/toast';
import { ToastItem } from '@/components/feedback/Toast/ToastItem';
import type { ToastObject } from '@/components/feedback/Toast/types';

export function ToastList() {
  const { toasts } = Toast.useToastManager();

  return (toasts as ToastObject[]).map((toast) => (
    <ToastItem key={toast.id} toast={toast} />
  ));
}
