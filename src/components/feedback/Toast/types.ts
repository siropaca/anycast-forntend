import type { ToastObject as BaseToastObject } from '@base-ui/react/toast';

export type ToastType = 'success' | 'error';

export interface ToastData {
  type: ToastType;
}

export type ToastObject = BaseToastObject<ToastData>;
