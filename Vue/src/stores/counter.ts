import { defineStore } from 'pinia'

interface WindowState {
  windowWidth: number;
}
interface UseWindowReturn {
  padding: number;
  height: number;
}

type RemoveListenerFn = () => void

export const useWindowStore = defineStore('window', {
  state: (): WindowState => ({
    windowWidth: 0,
  }),

  actions: {
    updateWindowWidth(): void {
      this.windowWidth = window.innerWidth
    },
    watchWindowResize(): RemoveListenerFn {
      this.updateWindowWidth()
      const handleResize = (): void => {
        this.updateWindowWidth()
      }
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    },
  },

  getters: {
    useWindow: (state: WindowState): UseWindowReturn => {
      const padding = (state.windowWidth - 7) * 0.05
      const height = (((state.windowWidth - 7) * 0.9) / 2 / 954) * 578
      return { padding, height }
    },
  },
})
