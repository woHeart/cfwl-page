import { AxiosError } from "axios";
import { ElMessage } from "element-plus";

export class BusinessError extends Error {
  code: string;
  constructor(message: string, code: string) {
    super(message);
    this.code = code;
    this.name = 'BusinessError';
  }
}

export class RequestTokenError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'RequestTokenError'
  }
}

export function handleCatchError(error: unknown): void {
  if (error instanceof AxiosError) {
    if (error.response) {
      const msg = error.response.status >= 500 ? '服务器异常' : '请求失败';
      ElMessage.error(msg);
    } else if (error.request) {
      ElMessage.error('网络连接失败，请检查网络');
    } else {
      ElMessage.error('请求发生错误，请稍后再试');
    }
  } else if (error instanceof BusinessError || error instanceof RequestTokenError) {
    return
  } else {
    ElMessage.error('系统异常，请稍后再试');
    return console.error('未知错误！！！', error);
  }
  console.error(error);
}
