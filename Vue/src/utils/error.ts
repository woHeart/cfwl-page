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
