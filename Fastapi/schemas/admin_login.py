from pydantic import BaseModel
from typing import Optional
from datetime import datetime


# 请求模型
class LoginRequest(BaseModel):
    username: str
    password: str


# 响应内部数据模型
class LoginResponseData(BaseModel):
    username: str
    token: str
    expire_at: datetime
    last_login_at: Optional[datetime]


# 完整响应模型
class LoginResponse(BaseModel):
    code: int = 200
    msg: str = "登录成功"
    data: LoginResponseData
