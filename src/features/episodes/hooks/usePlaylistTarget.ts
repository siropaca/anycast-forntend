'use client';

import { useState } from 'react';

import type { ResponseEpisodeResponse } from '@/libs/api/generated/schemas/responseEpisodeResponse';

/**
 * プレイリスト追加モーダルの対象エピソード選択を管理する
 *
 * @param episodes - エピソード一覧
 * @returns モーダル制御に必要な状態とハンドラー
 */
export function usePlaylistTarget(episodes: ResponseEpisodeResponse[]) {
  const [targetEpisodeId, setTargetEpisodeId] = useState<string | null>(null);

  const targetEpisode = episodes.find((ep) => ep.id === targetEpisodeId);

  function open(episodeId: string) {
    setTargetEpisodeId(episodeId);
  }

  function close() {
    setTargetEpisodeId(null);
  }

  return {
    isOpen: targetEpisodeId !== null,
    episodeId: targetEpisodeId ?? '',
    currentPlaylistIds: targetEpisode?.playlistIds ?? [],
    open,
    close,
  };
}
