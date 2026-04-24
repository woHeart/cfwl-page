from fastapi import Request
from fastapi.security import HTTPBearer
from jose.exceptions import ExpiredSignatureError, JWTError
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response, JSONResponse
from starlette.status import HTTP_401_UNAUTHORIZED

from core.redis_client import redis_client
from utils.jwt_token import decode_access_token

# 不需要认证的路径白名单
PUBLIC_PATHS = {"/admin/login", "/docs", "/openapi.json", "/menu"}

security = HTTPBearer(auto_error=False)


class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:

        if request.url.path in PUBLIC_PATHS:
            return await call_next(request)

        credentials = await security(request)
        if not credentials:
            return JSONResponse(
                status_code=HTTP_401_UNAUTHORIZED,
                content={"detail": "Missing or invalid credentials"},
            )

        try:
            payload = decode_access_token(token=credentials.credentials)
            print(payload)
            name = f"token:{payload['sub']}"
            tk = await redis_client.get(name)
            print(tk)
            if tk is None:
                return JSONResponse(
                    status_code=HTTP_401_UNAUTHORIZED,
                    content={"detail": "Token not found or expired"},
                )
            # 验证通过，继续处理请求
            return await call_next(request)
        except ExpiredSignatureError:
            return JSONResponse(
                status_code=HTTP_401_UNAUTHORIZED,
                content={"detail": "Token has expired"},
            )
        except JWTError:
            return JSONResponse(
                status_code=HTTP_401_UNAUTHORIZED, content={"detail": "Invalid token"}
            )
