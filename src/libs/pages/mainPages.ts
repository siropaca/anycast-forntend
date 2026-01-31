import { buildQuery } from '@/libs/pages/buildQuery';

/** ログインページの検索パラメータ */
export type LoginSearchParams = {
  /** ログイン後のリダイレクト先 */
  redirect?: string;
};

/** 新規登録ページの検索パラメータ */
export type SignupSearchParams = {
  /** 登録後のリダイレクト先 */
  redirect?: string;
};

/** 探索ページの検索パラメータ */
export type ExploreSearchParams = {
  q?: string;
};

export const mainPages = {
  /** ホーム */
  home: {
    path: () => '/',
    title: 'ホーム',
  },
  /** ユーザー */
  user: {
    path: (username: string) => `/users/${username}`,
    title: (username: string) => `@${username}`,
  },
  /** チャンネル詳細 */
  channel: {
    path: (channelSlug: string) => `/channel/${channelSlug}`,
    title: 'チャンネル詳細',
  },
  /** エピソード詳細 */
  episode: {
    path: (channelSlug: string, episodeId: string) =>
      `/channel/${channelSlug}/episodes/${episodeId}`,
    title: 'エピソード詳細',
  },
  /** ログイン */
  login: {
    path: (params?: LoginSearchParams) => `/login${buildQuery(params)}`,
    title: 'ログイン',
  },
  /** 新規登録 */
  signup: {
    path: (params?: SignupSearchParams) => `/signup${buildQuery(params)}`,
    title: '新規登録',
  },
  /** おすすめのエピソード一覧 */
  episodes: {
    path: () => '/episodes',
    title: 'おすすめのエピソード',
  },
  /** おすすめのチャンネル一覧 */
  channels: {
    path: () => '/channels',
    title: 'おすすめのチャンネル',
  },
  /** 探索 */
  explore: {
    path: (params?: ExploreSearchParams) => `/explore${buildQuery(params)}`,
    title: '探索',
  },
  /** ライブラリ */
  library: {
    /** フォロー中 */
    following: {
      path: () => '/library/following',
      title: 'フォロー中',
      pageTitle: 'フォロー中のユーザー',
    },
    /** 再生リスト */
    playList: {
      path: () => '/library/playlist',
      title: '再生リスト',
    },
    /** 再生リスト詳細 */
    playListDetail: {
      path: (playlistId: string) => `/library/playlist/${playlistId}`,
      title: '再生リスト詳細',
    },
    /** 高評価 */
    likes: {
      path: () => '/library/likes',
      title: '高評価',
      pageTitle: '高評価したエピソード',
    },
    /** 履歴 */
    history: {
      path: () => '/library/history',
      title: '履歴',
    },
  },
} as const;
