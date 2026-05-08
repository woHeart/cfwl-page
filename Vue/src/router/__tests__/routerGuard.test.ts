import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { ElMessage } from 'element-plus'
import { isTokenValid, removeToken } from '@/utils/auth'

// ---------- 模拟外部依赖 ----------
// 将 isTokenValid 和 removeToken 变为我们能够随意控制的假函数
const mockIsTokenValid = vi.fn()
const mockRemoveToken = vi.fn()

vi.mock('@/utils/auth', () => ({
  isTokenValid: () => mockIsTokenValid(),
  removeToken: () => mockRemoveToken()
}))

vi.mock('element-plus', () => ({
  ElMessage: {
    error: vi.fn(),
  },
}))

// ---------- 准备测试路由 ----------
const testRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: { template: '<div>Home</div>' },
  },
  {
    path: '/account',
    name: 'account',
    component: { template: '<div>Account</div>' },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: { template: '<div>Dashboard</div>' },
    meta: { requiresAuth: true },
  },
]

// ---------- 守卫逻辑（直接内联，方便测试） ----------
function createGuard(router: ReturnType<typeof createRouter>) {
  router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isTokenValid()) {
      removeToken()
      next('/account')
      ElMessage.error('请先登录账号')
    } else {
      next()
    }
  })
}

// ---------- 测试套件 ----------
describe('路由守卫 beforeEach', () => {
  let router: ReturnType<typeof createRouter>

  beforeEach(() => {
    // 每个用例前重置所有 mock 状态
    vi.clearAllMocks()
    // 创建一个新的 router 实例
    router = createRouter({
      history: createWebHistory(),
      routes: testRoutes,
    })
    // 安装守卫
    createGuard(router)
  })

  // --- 用例1：需要认证 + token 无效 → 重定向到 /account ---
  it('需要认证且 token 无效时应重定向到 /account', async () => {
    mockIsTokenValid.mockReturnValue(false)
    await router.push('/dashboard')
    // 导航完成后，路由应停留在 /account
    expect(router.currentRoute.value.path).toBe('/account')
  })

  // --- 用例2：需要认证 + token 无效 → 调用了 removeToken ---
  it('需要认证且 token 无效时应清除 token', async () => {
    mockIsTokenValid.mockReturnValue(false)
    await router.push('/dashboard')
    expect(mockRemoveToken).toHaveBeenCalledOnce()
  })

  // --- 用例3：需要认证 + token 无效 → 弹出错误消息 ---
  it('需要认证且 token 无效时应提示错误消息', async () => {
    mockIsTokenValid.mockReturnValue(false)
    await router.push('/dashboard')
    expect(ElMessage.error).toHaveBeenCalledWith('请先登录账号')
  })

  // --- 用例4：需要认证 + token 有效 → 直接放行，路由不变 ---
  it('需要认证但 token 有效时应正常进入目标页面', async () => {
    mockIsTokenValid.mockReturnValue(true)
    await router.push('/dashboard')
    expect(router.currentRoute.value.path).toBe('/dashboard')
    // 且不应该清 token
    expect(mockRemoveToken).not.toHaveBeenCalled()
    // 不应该弹错误
    expect(ElMessage.error).not.toHaveBeenCalled()
  })

  // --- 用例5：不需要认证的路由 → 直接放行 ---
  it('访问不需要认证的页面应直接进入', async () => {
    // 即使 token 无效，因为页面不需要认证，所以也应放行
    mockIsTokenValid.mockReturnValue(false)
    await router.push('/')
    expect(router.currentRoute.value.path).toBe('/')
    expect(mockRemoveToken).not.toHaveBeenCalled()
    expect(ElMessage.error).not.toHaveBeenCalled()
  })

  // --- 用例6：访问 /account 时即使 token 无效也不会触发清 token（因为 /account 不需要认证）---
  it('访问 /account 时不会触发重定向循环或错误清除', async () => {
    mockIsTokenValid.mockReturnValue(false)
    await router.push('/account')
    expect(router.currentRoute.value.path).toBe('/account')
    // 不会再次清 token
    expect(mockRemoveToken).not.toHaveBeenCalled()
    expect(ElMessage.error).not.toHaveBeenCalled()
  })
})
