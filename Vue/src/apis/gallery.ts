import http from '@/utils/http.js'
import type { AtlasParams, MusicCard, VideoCard, AtlasCard } from '@/types'

export const getAtlas = (page: number) => {
  return http.get<AtlasCard, AtlasParams>('/atlas', { page })
}

export const getVideo = () => {
  return http.get<VideoCard[]>('/video')
}

export const getMusic = () => {
  return http.get<MusicCard[]>('/music')
}
