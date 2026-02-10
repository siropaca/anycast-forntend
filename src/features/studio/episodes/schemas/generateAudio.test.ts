import { generateAudioFormSchema } from '@/features/studio/episodes/schemas/generateAudio';

describe('generateAudio', () => {
  describe('generateAudioFormSchema', () => {
    it('type=voice で BGM なしの場合にバリデーションが通る', () => {
      const result = generateAudioFormSchema.safeParse({
        type: 'voice',
        voiceStyle: '明るくテンポよく',
      });
      expect(result.success).toBe(true);
    });

    it('type=full で bgmId 指定の場合にバリデーションが通る', () => {
      const result = generateAudioFormSchema.safeParse({
        type: 'full',
        voiceStyle: '明るく',
        bgmId: 'bgm-1',
      });
      expect(result.success).toBe(true);
    });

    it('type=full で systemBgmId 指定の場合にバリデーションが通る', () => {
      const result = generateAudioFormSchema.safeParse({
        type: 'full',
        voiceStyle: '',
        systemBgmId: 'sys-bgm-1',
      });
      expect(result.success).toBe(true);
    });

    it('type=remix で bgmId 指定の場合にバリデーションが通る', () => {
      const result = generateAudioFormSchema.safeParse({
        type: 'remix',
        voiceStyle: '',
        bgmId: 'bgm-1',
      });
      expect(result.success).toBe(true);
    });

    it('type=full で BGM 未指定の場合にバリデーションエラーになる', () => {
      const result = generateAudioFormSchema.safeParse({
        type: 'full',
        voiceStyle: '',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('BGMを選択してください');
      }
    });

    it('type=remix で BGM 未指定の場合にバリデーションエラーになる', () => {
      const result = generateAudioFormSchema.safeParse({
        type: 'remix',
        voiceStyle: '',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('BGMを選択してください');
      }
    });

    it('bgmId と systemBgmId を同時に指定するとバリデーションエラーになる', () => {
      const result = generateAudioFormSchema.safeParse({
        type: 'full',
        voiceStyle: '',
        bgmId: 'bgm-1',
        systemBgmId: 'sys-bgm-1',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'BGMとシステムBGMは同時に指定できません',
        );
      }
    });

    it('voiceStyle が 500 文字を超えるとバリデーションエラーになる', () => {
      const result = generateAudioFormSchema.safeParse({
        type: 'voice',
        voiceStyle: 'a'.repeat(501),
      });
      expect(result.success).toBe(false);
    });

    it('type=voice で BGM を指定してもバリデーションが通る', () => {
      const result = generateAudioFormSchema.safeParse({
        type: 'voice',
        voiceStyle: '',
        bgmId: 'bgm-1',
      });
      expect(result.success).toBe(true);
    });

    it('不正な type はバリデーションエラーになる', () => {
      const result = generateAudioFormSchema.safeParse({
        type: 'invalid',
        voiceStyle: '',
      });
      expect(result.success).toBe(false);
    });

    it('オプショナルな BGM パラメータが有効範囲内であれば通る', () => {
      const result = generateAudioFormSchema.safeParse({
        type: 'full',
        voiceStyle: '',
        bgmId: 'bgm-1',
        bgmVolumeDb: -10,
        fadeOutMs: 5000,
        paddingStartMs: 1000,
        paddingEndMs: 2000,
      });
      expect(result.success).toBe(true);
    });

    it('bgmVolumeDb が範囲外の場合にバリデーションエラーになる', () => {
      const result = generateAudioFormSchema.safeParse({
        type: 'full',
        voiceStyle: '',
        bgmId: 'bgm-1',
        bgmVolumeDb: 1,
      });
      expect(result.success).toBe(false);
    });
  });
});
