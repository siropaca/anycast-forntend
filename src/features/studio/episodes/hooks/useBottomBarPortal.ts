import { useEffect, useState } from 'react';
import { MAIN_SCROLL_VIEWPORT_ID } from '@/features/app/components/LayoutBody';

/**
 * ボトムバー用のポータルコンテナを取得し、ビューポートに padding-bottom を設定する
 *
 * @returns ポータル先の要素（未取得時は null）
 */
export function useBottomBarPortal(): HTMLElement | null {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null,
  );

  useEffect(() => {
    const viewport = document.getElementById(MAIN_SCROLL_VIEWPORT_ID);
    setPortalContainer(viewport?.parentElement ?? null);

    // Viewport にボトムバー分の padding-bottom を追加して
    // フッター（利用規約等）がバーの裏に隠れるのを防ぐ
    if (viewport) {
      viewport.style.paddingBottom = '5rem';
    }

    return () => {
      if (viewport) {
        viewport.style.paddingBottom = '';
      }
    };
  }, []);

  return portalContainer;
}
