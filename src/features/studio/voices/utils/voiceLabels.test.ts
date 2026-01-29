import { getGenderLabel, getProviderLabel } from './voiceLabels';

describe('voiceLabels', () => {
  describe('getProviderLabel()', () => {
    it('google を Gemini TTS に変換する', () => {
      expect(getProviderLabel('google')).toBe('Gemini TTS');
    });

    it('未知のプロバイダーはそのまま返す', () => {
      expect(getProviderLabel('unknown-provider')).toBe('unknown-provider');
    });
  });

  describe('getGenderLabel()', () => {
    it('male を 男性 に変換する', () => {
      expect(getGenderLabel('male')).toBe('男性');
    });

    it('female を 女性 に変換する', () => {
      expect(getGenderLabel('female')).toBe('女性');
    });

    it('未知の性別はそのまま返す', () => {
      expect(getGenderLabel('other')).toBe('other');
    });
  });
});
