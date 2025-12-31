import { describe, expect, it } from 'vitest';
import { settingsPages } from '@/libs/pages/settingsPages';

describe('settingsPages', () => {
  describe('index', () => {
    it('path が /settings を返す', () => {
      expect(settingsPages.index.path()).toBe('/settings');
    });

    it('title が設定されている', () => {
      expect(settingsPages.index.title).toBe('設定');
    });
  });

  describe('account', () => {
    it('path が /settings/account を返す', () => {
      expect(settingsPages.account.path()).toBe('/settings/account');
    });

    it('title が設定されている', () => {
      expect(settingsPages.account.title).toBe('アカウント');
    });
  });

  describe('subscription', () => {
    it('path が /settings/subscription を返す', () => {
      expect(settingsPages.subscription.path()).toBe('/settings/subscription');
    });

    it('title が設定されている', () => {
      expect(settingsPages.subscription.title).toBe('サブスクリプション');
    });
  });
});
