// LoginForm.test.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Login from '../Login.vue'
import { nextTick, reactive } from 'vue'

const mockFormData = reactive({
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
  })

  it('点击登录按钮应该调用 loginVerify,并传入表单引用', async () => {
    const wrapper = mount(Login)

    wrapper.vm.formData.account = '123 456'
await nextTick()

// 触发失焦以执行校验
const accountInput = wrapper.find('input[placeholder="输入账号"]')
await accountInput.trigger('blur')
await nextTick()

// 现在查看 DOM，应该能看到 value 属性和错误提示
console.log(wrapper.html())
let errors: any = null
  const formRef = (wrapper.vm as any).$refs.loginFormRef
try {
  await formRef.validate()
} catch (e) {
  errors = e
}
console.log(errors)




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
