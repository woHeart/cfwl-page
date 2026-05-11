// LoginForm.test.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Login from './Login.vue'
import type * as UseAuthModule from './useAuth';

vi.mock('./useAuth', async (importOriginal) => {
  const actual = await importOriginal<typeof UseAuthModule>();

  return {
    ...actual,
    loginVerify: vi.fn(),
  };
});

import { loginVerify } from './useAuth'

describe('LoginForm 按钮测试', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('点击登录按钮应该调用 loginVerify,并传入表单引用', async () => {
    const wrapper = mount(Login)

    const button = wrapper.find('.login-button')

    await button.trigger('click')

    expect(loginVerify).toHaveBeenCalledTimes(1)

    expect(loginVerify).toHaveBeenCalledWith(
      expect.objectContaining({
        validate: expect.any(Function),
      })
    )
  })
})
