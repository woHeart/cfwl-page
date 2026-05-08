// window.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useWindowStore } from './counter'

describe('useWindowStore', () => {
  beforeEach(() => {
    // 每个测试用例前，都创建一个全新的 Pinia 实例，避免状态污染
    setActivePinia(createPinia())
    // 重置 window.innerWidth 为一个已知值
    vi.stubGlobal('innerWidth', 1024)
  })

  it('updateWindowWidth 应把当前窗口宽度存入 state', () => {
    const store = useWindowStore()
    store.updateWindowWidth()
    expect(store.windowWidth).toBe(1024)
  })

  it('watchWindowResize 应在 resize 事件触发时更新窗口宽度', () => {
    const store = useWindowStore()
    const removeListener = store.watchWindowResize()

    // 改变模拟的窗口宽度
    vi.stubGlobal('innerWidth', 800)
    // 手动触发 resize 事件
    window.dispatchEvent(new Event('resize'))

    expect(store.windowWidth).toBe(800)

    removeListener()
  })

  it('watchWindowResize 返回的函数应移除事件监听，不再响应 resize', () => {
    const store = useWindowStore()
    const removeListener = store.watchWindowResize()

    vi.stubGlobal('innerWidth', 800)
    window.dispatchEvent(new Event('resize'))
    expect(store.windowWidth).toBe(800)

    removeListener()

    // 再次改变宽度并触发
    vi.stubGlobal('innerWidth', 600)
    window.dispatchEvent(new Event('resize'))
    // 状态应该还是上一次的值 800，而不是 600
    expect(store.windowWidth).toBe(800)
  })

  it('useWindow getter 应根据宽度正确计算 padding 和 height', () => {
    const store = useWindowStore()
    store.windowWidth = 1024
    const result = store.useWindow

    // 根据公式手工计算预期值
    const expectedPadding = (1024 - 7) * 0.05
    const expectedHeight = (((1024 - 7) * 0.9) / 2 / 954) * 578

    expect(result.padding).toBeCloseTo(expectedPadding, 2)
    expect(result.height).toBeCloseTo(expectedHeight, 2)
  })

  it('useWindow getter 在宽度为 0 时应返回数值而不是 NaN', () => {
    const store = useWindowStore()
    store.windowWidth = 0
    const result = store.useWindow

    expect(result.padding).not.toBeNaN()
    expect(result.height).not.toBeNaN()
  })
})
