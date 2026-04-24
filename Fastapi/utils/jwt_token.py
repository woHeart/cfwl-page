from datetime import datetime, timedelta, timezone
from typing import Optional
from jose import jwt

SECRET_KEY = "my-admin-login-key"
ALGORITHM = "HS256"  # JWT签名算法


# 生成token
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    now = datetime.now(timezone.utc)
    # 过期时间：UTC时间（避免时区问题，安全最佳实践）
    expire = now + expires_delta
    to_encode.update({"exp": expire, "iat": now})  # 新增签发时间
    # 生成Token（用SECRET_KEY签名）
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# 解码token
def decode_access_token(token: str):
    # 解码核心逻辑：验证签名+过期时间+算法
    payload = jwt.decode(
        token,
        SECRET_KEY,
        algorithms=[ALGORITHM],
        options={
            "verify_exp": True,  # 验证过期时间（默认True，可显式指定）
            "verify_iat": True,  # 验证签发时间（默认True）
        },
    )
    return payload
