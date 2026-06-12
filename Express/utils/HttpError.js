class HttpError extends Error {

  constructor(httpStatus, businessCode, message, data = null) {
    super(message);
    this.status = httpStatus;
    this.code = businessCode;
    this.data = data;
    this.name = 'HttpError';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }
  }

  toJSON() {
    return {
      code: this.code,
      msg: this.message,
      data: this.data,
    };
  }
}

export default HttpError;