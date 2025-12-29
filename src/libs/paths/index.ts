import { buildQuery } from '@/libs/paths/buildQuery';

/**
 * アプリケーションのパス定義
 *
 * @example
 * Paths.home()                            // => '/'
 * Paths.login()                           // => '/login'
 * Paths.login({ redirect: '/dashboard' }) // => '/login?redirect=%2Fdashboard'
 * Paths.studio.index()                    // => '/studio'
 * Paths.settings.index()                  // => '/settings'
 */
export const Paths = {
  /** ホームページ */
  home: () => '/',

  /** ログインページ */
  login: (params?: {
    redirect?: string; // ログイン後のリダイレクト先
  }) => `/login${buildQuery(params)}`,

  /** 新規登録ページ */
  signup: (params?: {
    redirect?: string; // ログイン後のリダイレクト先
  }) => `/signup${buildQuery(params)}`,

  /** 検索 */
  search: () => '/search',

  /** ライブラリ */
  library: {
    /** 再生履歴 */
    history: () => '/library/history',
    /** お気に入り */
    favorites: () => '/library/favorites',
    /** フォロー中 */
    following: () => '/library/following',
  },

  /** Studio */
  studio: {
    /** Studio トップ（ダッシュボード） */
    index: () => '/studio',
    /** ダッシュボード */
    dashboard: () => '/studio/dashboard',
    /** チャンネル */
    channels: () => '/studio/channels',
  },

  /** 設定 */
  settings: {
    /** 設定トップ（アカウント） */
    index: () => '/settings',
    /** アカウント */
    account: () => '/settings/account',
    /** サブスクリプション */
    subscription: () => '/settings/subscription',
  },
} as const;
