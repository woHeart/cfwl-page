// Login.test.ts
import { mount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Login from '../Login.vue'
import { reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import { LoginFormData } from '@/types/component.js'
import { ValidateError } from '@/types/vitest.js'

const mockFormData = reactive<LoginFormData>({
  account: '',
  password: '',
})
const mockLoginVerify = vi.fn()

vi.mock('../useAuth', () => ({
  useAuth: vi.fn(() => ({
    formData: mockFormData,
    loginVerify: mockLoginVerify,
  })),
}))

vi.mock('element-plus', async () => {
  const actual = await vi.importActual<typeof import('element-plus')>('element-plus')
  return {
    ...actual,
    ElMessage: {
      success: vi.fn(),
      error: vi.fn(),
    },
  }
})

describe('LoginForm 按钮测试', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockFormData.account = ''
    mockFormData.password = ''
  })

  it('点击登录按钮应该调用 loginVerify,并传入表单引用', async () => {
    const wrapper: VueWrapper = mount(Login)

    const button = wrapper.find('.login-button')
    await button.trigger('click')

    expect(mockLoginVerify).toHaveBeenCalledTimes(1)
    expect(mockLoginVerify).toHaveBeenCalledWith(
      expect.objectContaining({
        validate: expect.any(Function),
      })
    )
  })

  it('账号输入"123 456"时校验提示“赶紧给劳资去掉空格！！！”', async () => {
    const wrapper: VueWrapper = mount(Login)

    mockFormData.account = '123 456'

    const formRef = wrapper.vm.$refs.loginFormRef as FormInstance
    let errors: ValidateError = null
    try {
      await formRef.validate()
    } catch (e: unknown) {
      errors = e as ValidateError
    }

    expect(errors).not.toBeNull()
    expect(errors!.account).toBeDefined()
    expect(errors!.account[0].message).toBe('赶紧给劳资去掉空格！！！')
  })

  it('账号输入"123"时校验提示“账号？？？”', async () => {
    const wrapper: VueWrapper = mount(Login)

    mockFormData.account = '123'

    const formRef = wrapper.vm.$refs.loginFormRef as FormInstance
    let errors: ValidateError = null
    try {
      await formRef.validate()
    } catch (e: unknown) {
      errors = e as ValidateError
    }

    expect(errors).not.toBeNull()
    expect(errors!.account).toBeDefined()
    expect(errors!.account[0].message).toBe('账号？？？')
  })

  it('密码输入"123 456"时校验提示空格错误', async () => {
    const wrapper: VueWrapper = mount(Login)

    mockFormData.account = 'validUser'
    mockFormData.password = '123 456'

    const formRef = wrapper.vm.$refs.loginFormRef as FormInstance
    let errors: ValidateError = null
    try {
      await formRef.validate()
    } catch (e: unknown) {
      errors = e as ValidateError
    }

    expect(errors).not.toBeNull()
    expect(errors!.password).toBeDefined()
    expect(errors!.password[0].message).toBe('赶紧给劳资去掉空格！！！')
  })

  it('密码输入"123456"时校验提示“密码？？？”', async () => {
    const wrapper: VueWrapper = mount(Login)

    mockFormData.account = 'validUser'
    mockFormData.password = '123456'

    const formRef = wrapper.vm.$refs.loginFormRef as FormInstance
    let errors: ValidateError = null
    try {
      await formRef.validate()
    } catch (e: unknown) {
      errors = e as ValidateError
    }

    expect(errors).not.toBeNull()
    expect(errors!.password).toBeDefined()
    expect(errors!.password[0].message).toBe('密码？？？')
  })
})
