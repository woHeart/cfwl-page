// src/apis/__tests__/accountLogin.test.ts
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { accountLogin } from '@/apis/accout'
import { http, HttpResponse } from 'msw'
import { server } from '@/__tests__/mocks/server'

// 手动启动/重置/关闭 MSW server
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('accountLogin 集成测试', () => {
  it('正确账号密码应返回 account 和 token', async () => {
    const result = await accountLogin({ account: '123456789', password: '123456789' })
    expect(result).toEqual({ account: '123456789', token: 'abc123' })
  })

  it('错误密码应抛出异常', async () => {
    await expect(
      accountLogin({ account: '123456789', password: 'wrong' })
    ).rejects.toThrow()
  })

  it('网络异常时应能捕获错误', async () => {
    server.use(
      http.post('/vue/user/login', () => {
        return HttpResponse.error()
      })
    )
    await expect(
      accountLogin({ account: '123456789', password: '123456789' })
    ).rejects.toThrow()
  })
})
