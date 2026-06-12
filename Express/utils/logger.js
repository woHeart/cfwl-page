import winston from "winston";
import HttpError from "./HttpError.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 日志根目录
const logDir = join(__dirname, "../logs");

// 自定义日志格式
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ level, message, timestamp, stack }) => {
    if (stack) {
      return `${timestamp} [${level.toUpperCase()}]: ${message}\n${stack}`;
    }
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
  })
);

// HTTP 日志记录器 - 记录 HTTP 错误
const httpLogger = winston.createLogger({
  level: "error",
  format: logFormat,
  transports: [
    new winston.transports.File({
      filename: join(logDir, "http.log"),
      level: "error",
    }),
  ],
});

// 通用错误日志记录器 - 记录其他错误
const errorLogger = winston.createLogger({
  level: "error",
  format: logFormat,
  transports: [
    new winston.transports.File({
      filename: join(logDir, "error.log"),
      level: "error",
    }),
  ],
});

/**
 * 判断是否为 HTTP 错误
 * @param {Error} err - 错误对象
 * @returns {boolean} - 是否为 HTTP 错误
 */
const isHttpError = (err) => {
  return err instanceof HttpError;
};

/**
 * 记录错误日志
 * @param {Error} err - 错误对象
 * @param {Object} req - Express 请求对象
 */
export const logError = (err, req = null) => {
  const errorInfo = {
    method: req?.method,
    url: req?.originalUrl || req?.url,
    status: err.status || err.statusCode || 500,
    message: err.message,
    stack: err.stack,
    userAgent: req?.get("User-Agent"),
  };

  const logMessage = req
    ? `[${errorInfo.method} ${errorInfo.url}] Status: ${errorInfo.status} - ${errorInfo.message}`
    : `${errorInfo.message}`;

  // 根据错误类型选择不同的日志记录器
  if (isHttpError(err)) {
    httpLogger.error(logMessage, { stack: err.stack });
  } else {
    errorLogger.error(logMessage, { stack: err.stack });
  }
};

// 导出日志记录器实例，方便其他地方直接使用
export { httpLogger, errorLogger };

// 默认导出
export default {
  httpLogger,
  errorLogger,
  logError,
};
