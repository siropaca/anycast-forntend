import { Paths } from '@/libs/paths';

describe('Paths', () => {
  describe('home', () => {
    it('ホームページのパスを返す', () => {
      expect(Paths.home()).toBe('/');
    });
  });

  describe('login', () => {
    it('ログインページのパスを返す', () => {
      expect(Paths.login()).toBe('/login');
    });

    it('redirect パラメータ付きのパスを返す', () => {
      expect(Paths.login({ redirect: '/dashboard' })).toBe(
        '/login?redirect=%2Fdashboard',
      );
    });

    it('redirect が undefined の場合はパラメータなしのパスを返す', () => {
      expect(Paths.login({ redirect: undefined })).toBe('/login');
    });
  });

  describe('signup', () => {
    it('サインアップページのパスを返す', () => {
      expect(Paths.signup()).toBe('/signup');
    });

    it('redirect パラメータ付きのパスを返す', () => {
      expect(Paths.signup({ redirect: '/settings' })).toBe(
        '/signup?redirect=%2Fsettings',
      );
    });
  });

  describe('search', () => {
    it('検索ページのパスを返す', () => {
      expect(Paths.search()).toBe('/search');
    });
  });

  describe('library', () => {
    it('再生履歴ページのパスを返す', () => {
      expect(Paths.library.history()).toBe('/library/history');
    });

    it('お気に入りページのパスを返す', () => {
      expect(Paths.library.favorites()).toBe('/library/favorites');
    });

    it('フォロー中ページのパスを返す', () => {
      expect(Paths.library.following()).toBe('/library/following');
    });
  });

  describe('studio', () => {
    it('Studio トップのパスを返す', () => {
      expect(Paths.studio.index()).toBe('/studio');
    });

    it('ダッシュボードページのパスを返す', () => {
      expect(Paths.studio.dashboard()).toBe('/studio/dashboard');
    });

    it('チャンネルページのパスを返す', () => {
      expect(Paths.studio.channels()).toBe('/studio/channels');
    });
  });

  describe('settings', () => {
    it('設定トップのパスを返す', () => {
      expect(Paths.settings.index()).toBe('/settings');
    });

    it('アカウントページのパスを返す', () => {
      expect(Paths.settings.account()).toBe('/settings/account');
    });

    it('サブスクリプションページのパスを返す', () => {
      expect(Paths.settings.subscription()).toBe('/settings/subscription');
    });
  });
});
