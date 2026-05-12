// LoginForm.test.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Login from '../Login.vue'

const mockLoginVerify = vi.fn()

vi.mock('../useAuth', () => ({
  useAuth: vi.fn(() => ({
    formData: {
      account: '',
      password: '',
    },
    loginVerify: mockLoginVerify,
  })),
}))

describe('LoginForm 按钮测试', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('点击登录按钮应该调用 loginVerify,并传入表单引用', async () => {
    const wrapper = mount(Login)

    const button = wrapper.find('.login-button')

    await button.trigger('click')

    expect(mockLoginVerify).toHaveBeenCalledTimes(1)

    expect(mockLoginVerify).toHaveBeenCalledWith(
      expect.objectContaining({
        validate: expect.any(Function),
      })
    )
  })
})
