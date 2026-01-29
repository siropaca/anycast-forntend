'use client';

import { PauseIcon, PlayIcon } from '@phosphor-icons/react';
import { DataTable } from '@/components/dataDisplay/DataTable/DataTable';
import { Pagination } from '@/components/navigation/Pagination/Pagination';
import { MAIN_SCROLL_VIEWPORT_ID } from '@/features/app/components/LayoutBody';
import { useBgmPlayer } from '@/features/studio/bgm/hooks/useBgmPlayer';
import { useMyBgmList } from '@/features/studio/bgm/hooks/useMyBgmList';
import type { ResponseBgmWithEpisodesResponse } from '@/libs/api/generated/schemas';

export function BgmList() {
  const { bgms, currentPage, totalPages, setCurrentPage } = useMyBgmList();
  const { isBgmPlaying, playBgm, pauseBgm } = useBgmPlayer();

  function handlePageChange(page: number) {
    setCurrentPage(page);
    document
      .getElementById(MAIN_SCROLL_VIEWPORT_ID)
      ?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handlePlayClick(
    e: React.MouseEvent<HTMLButtonElement>,
    bgm: ResponseBgmWithEpisodesResponse,
  ) {
    e.stopPropagation();

    if (isBgmPlaying(bgm)) {
      pauseBgm();
    } else {
      playBgm(bgm, bgms);
    }
  }

  const columns = [
    {
      key: 'name',
      header: 'BGM名',
      accessor: (bgm: ResponseBgmWithEpisodesResponse) => (
        <span>{bgm.name}</span>
      ),
    },
    {
      key: 'play',
      header: '',
      className: 'px-4 py-3 text-right',
      accessor: (bgm: ResponseBgmWithEpisodesResponse) => (
        <button
          type="button"
          aria-label={isBgmPlaying(bgm) ? '一時停止' : '再生'}
          className="inline-flex size-8 items-center justify-center rounded-full bg-secondary text-bg-main transition-transform hover:scale-105 cursor-pointer"
          onClick={(e) => handlePlayClick(e, bgm)}
        >
          {isBgmPlaying(bgm) ? (
            <PauseIcon size={16} weight="fill" />
          ) : (
            <PlayIcon size={16} weight="fill" />
          )}
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={bgms}
        emptyMessage="BGMがありません"
        keyExtractor={(bgm) => bgm.id}
      />

      <div className="flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
