import http from '@/utils/http.js'

export const getWordBannerAPI = () => {
  return http.get<string[]>('/wordbanner')
}
