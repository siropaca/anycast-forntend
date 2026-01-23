'use client';

import Link from 'next/link';
import { useDeleteBgm } from '@/features/studio/bgm/hooks/useDeleteBgm';
import type { ResponseBgmWithEpisodesResponse } from '@/libs/api/generated/schemas';
import { studioPages } from '@/libs/pages/studioPages';

interface Props {
  bgm: ResponseBgmWithEpisodesResponse;
}

export function BgmListItem({ bgm }: Props) {
  const { deleteBgm, isDeleting, error } = useDeleteBgm();

  function handleDeleteClick() {
    deleteBgm(bgm.id);
  }

  return (
    <li className="border p-2">
      <div className="flex items-center justify-between">
        <span>{bgm.name}</span>
        <button
          type="button"
          className="border px-2"
          disabled={isDeleting}
          onClick={handleDeleteClick}
        >
          {isDeleting ? '削除中...' : '削除'}
        </button>
      </div>

      {error && <p>{error}</p>}

      <audio controls preload="metadata" className="mt-2 w-full">
        <source src={bgm.audio.url} />
      </audio>

      {bgm.channels.length > 0 && (
        <div>
          <span>デフォルト設定: </span>
          {bgm.channels.map((channel, index) => (
            <span key={channel.id}>
              {index > 0 && ', '}
              <Link
                href={studioPages.channel.path({ id: channel.id })}
                className="underline"
              >
                {channel.name}
              </Link>
            </span>
          ))}
        </div>
      )}

      {bgm.episodes.length > 0 && (
        <div>
          <span>使用エピソード: </span>
          {bgm.episodes.map((episode, index) => (
            <span key={episode.id}>
              {index > 0 && ', '}
              <Link
                href={studioPages.episode.path({
                  id: episode.channel.id,
                  episodeId: episode.id,
                })}
                className="underline"
              >
                {episode.title}
              </Link>
            </span>
          ))}
        </div>
      )}
    </li>
  );
}
