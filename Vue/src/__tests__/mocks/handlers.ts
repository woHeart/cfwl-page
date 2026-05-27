import { LoginFormData } from '@/types'
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('/vue/user/login', async ({ request }) => {
    const body = await request.json() as LoginFormData
    if (body.account === '123456789' && body.password === '123456789') {
      return HttpResponse.json({
        code: '200',
        msg: 'success',
        data: { account: '123456789', token: 'abc123' }
      })
    }

    return HttpResponse.json(
      { code: '401', msg: '账号或密码错误' },
      { status: 401 }
    )
  })
]
