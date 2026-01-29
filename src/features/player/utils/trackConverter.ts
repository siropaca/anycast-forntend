import { getProviderLabel } from '@/features/studio/voices/utils/voiceLabels';
import type { ResponseBgmWithEpisodesResponse } from '@/libs/api/generated/schemas/responseBgmWithEpisodesResponse';
import type { ResponseEpisodeResponse } from '@/libs/api/generated/schemas/responseEpisodeResponse';
import type { ResponseVoiceResponse } from '@/libs/api/generated/schemas/responseVoiceResponse';
import type { Track } from '@/stores/playerStore';

/**
 * エピソードレスポンスを Track に変換する
 *
 * @param episode - エピソードレスポンス
 * @param subtitle - サブタイトル（チャンネル名など）
 * @returns Track オブジェクト
 * @throws fullAudio が存在しない場合
 *
 * @example
 * toTrackFromEpisode(episode, 'My Channel')
 * // => { id: '...', type: 'episode', title: '...', ... }
 */
export function toTrackFromEpisode(
  episode: ResponseEpisodeResponse,
  subtitle: string,
): Track {
  if (!episode.fullAudio) {
    throw new Error('エピソードに音声データが存在しません');
  }

  return {
    id: episode.id,
    type: 'episode',
    title: episode.title,
    subtitle,
    artworkUrl: episode.artwork?.url,
    audioUrl: episode.fullAudio.url,
    durationMs: episode.fullAudio.durationMs,
  };
}

/**
 * ボイスレスポンスを Track に変換する
 *
 * @param voice - ボイスレスポンス
 * @returns Track オブジェクト
 *
 * @example
 * toTrackFromVoice(voice)
 * // => { id: '...', type: 'voiceSample', title: '...', ... }
 */
export function toTrackFromVoice(voice: ResponseVoiceResponse): Track {
  return {
    id: voice.id,
    type: 'voiceSample',
    title: voice.name,
    subtitle: getProviderLabel(voice.provider),
    artworkUrl: undefined,
    audioUrl: voice.sampleAudioUrl,
    durationMs: 0,
  };
}

/**
 * BGM レスポンスを Track に変換する
 *
 * @param bgm - BGM レスポンス
 * @returns Track オブジェクト
 *
 * @example
 * toTrackFromBgm(bgm)
 * // => { id: '...', type: 'bgm', title: '...', ... }
 */
export function toTrackFromBgm(bgm: ResponseBgmWithEpisodesResponse): Track {
  return {
    id: bgm.id,
    type: 'bgm',
    title: bgm.name,
    subtitle: undefined,
    artworkUrl: undefined,
    audioUrl: bgm.audio.url,
    durationMs: bgm.audio.durationMs,
  };
}
