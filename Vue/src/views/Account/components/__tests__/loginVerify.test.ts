import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuth } from '../useAuth'

const { loginVerify } = useAuth()

const { mockPush } = vi.hoisted(() => {
  return { mockPush: vi.fn() }
})

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush,
  })
}))

vi.mock('@/apis/accout', () => ({
  accountLogin: vi.fn()
}))

vi.mock('element-plus', () => ({
  ElMessage: {
    success: vi.fn()
  }
}))

vi.mock('@/utils/auth', () => ({
  setToken: vi.fn()
}))

// 导入被 mock 的函数，方便在测试里调用和断言
import { accountLogin } from '@/apis/accout'
import { ElMessage, FormInstance } from 'element-plus'
import { setToken } from '@/utils/auth'

describe('loginVerify', () => {

  const fakeRef: FormInstance = {
    validate: vi.fn().mockResolvedValue(undefined)
  } as unknown as FormInstance

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('请求返回 200 且带 token 时，应提示成功、存储 token、跳转首页', async () => {

    const mockAccount = 'user'
    const mockToken = 'abc123'

    vi.mocked(accountLogin).mockResolvedValue({ account: mockAccount, token: mockToken })

    await loginVerify(fakeRef)

    expect(fakeRef.validate).toHaveBeenCalledOnce()
    expect(accountLogin).toHaveBeenCalled()
    expect(ElMessage.success).toHaveBeenCalledWith('登录成功')
    expect(setToken).toHaveBeenCalledWith(mockToken, 3600)
    expect(mockPush).toHaveBeenCalledWith('/')
  })

  it('请求返回非 200时,不提示成功、不存 token、不跳转', async () => {

    vi.mocked(accountLogin).mockRejectedValue(new Error('账号错误'))

    await loginVerify(fakeRef)

    expect(fakeRef.validate).toHaveBeenCalledOnce()
    expect(accountLogin).toHaveBeenCalled()
    expect(ElMessage.success).not.toHaveBeenCalled()
    expect(setToken).not.toHaveBeenCalled()
    expect(mockPush).not.toHaveBeenCalled()
  })

  it('表单校验没通过时，不发送登录请求', async () => {

    const invalidRef: FormInstance = {
      validate: vi.fn().mockRejectedValue(new Error('表单错误'))
    } as unknown as FormInstance

    await loginVerify(invalidRef)

    expect(invalidRef.validate).toHaveBeenCalledOnce()
    expect(accountLogin).not.toHaveBeenCalled()
    expect(ElMessage.success).not.toHaveBeenCalled()
    expect(setToken).not.toHaveBeenCalled()
    expect(mockPush).not.toHaveBeenCalled()
  })
})
