# from datetime import datetime, UTC, timedelta
# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy import select
# from sqlalchemy.ext.asyncio import AsyncSession
# from starlette import status
# from deps.session_local import get_db
# from models.admin import Admin
# from schemas.admin_login import LoginRequest, LoginResponse
# from utils.jwt_password import verify_password
# from utils.jwt_token import create_access_token
#
# router = APIRouter()
#
# @router.post(
#     "/login",
#     response_model = LoginResponse,
#     status_code = status.HTTP_200_OK,
#     summary = "管理员登录"
# )
# async def login (
#         login_data: LoginRequest,
#         db: AsyncSession = Depends(get_db)
# ):
#     res = await db.execute(select(Admin).where(Admin.username == login_data.username))
#     admin = res.scalar()
#
#     if not admin:
#         raise HTTPException(
#             status_code = status.HTTP_401_UNAUTHORIZED,
#             detail = "用户名或密码错误",  # 不暴露具体错误（防暴力破解）
#         )
#     if admin.is_active:
#         raise HTTPException(
#             status_code = status.HTTP_403_FORBIDDEN,
#             detail = "账号已锁定，暂时无法登录"
#         )
#     if not verify_password(login_data.password, admin.hashed_password):  # 假设Admin模型的密码字段是password
#         raise HTTPException(
#             status_code = status.HTTP_401_UNAUTHORIZED,
#             detail = "用户名或密码错误",
#         )
#
#     admin.last_login_time = datetime.now(UTC)
#     await db.commit()
#     await db.refresh(admin)
#
#     access_token_expires = timedelta(minutes = 60)
#     access_token = create_access_token(
#         data = {
#             "sub": str(admin.id),  # 存储管理员ID（唯一标识，不存密码/手机号等敏感信息）
#             "username": admin.username
#         },
#         expires_delta = access_token_expires
#     )
#
#     return LoginResponse(
#         data = {
#             "username": admin.username,
#             "token": access_token,
#             "expire_at": datetime.now(UTC) + access_token_expires,  # Token过期时间（前端可提示）
#             "last_login_at": admin.last_login_time,  # 本次登录时间（前端展示）
#         }
#     )

from fastapi import APIRouter, Depends, HTTPException, status
from datetime import datetime, timedelta, timezone
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.db import get_db
from schemas.admin_login import LoginRequest, LoginResponse, LoginResponseData
from utils.jwt_password import verify_password
from utils.jwt_token import create_access_token
from core.set_token import redis_set_token

router = APIRouter()


@router.post("/login", response_model=LoginResponse)
async def login(login_data: LoginRequest, db: AsyncIOMotorDatabase = Depends(get_db)):

    try:
        admin_doc = await db.admin.find_one(
            {"username": login_data.username}, {"_id": 0}
        )

        if not admin_doc:
            raise HTTPException(status.HTTP_401_UNAUTHORIZED, "用户名或密码错误")

        if admin_doc.get("is_active", True):
            raise HTTPException(status.HTTP_403_FORBIDDEN, "账号已锁定，暂时无法登录")

        if not verify_password(login_data.password, admin_doc["hashed_password"]):
            raise HTTPException(status.HTTP_401_UNAUTHORIZED, "用户名或密码错误")

        # 更新最后登录时间
        now = datetime.now(timezone.utc)
        await db.admin.update_one(
            {"username": login_data.username}, {"$set": {"last_login_time": now}}
        )

        # 生成 JWT
        expires_second: int = 60
        expires_delta = timedelta(seconds=expires_second)

        access_token = create_access_token(
            data={"sub": login_data.username, "username": login_data.username},
            expires_delta=expires_delta,
        )

        data = LoginResponseData(
            username=admin_doc["username"],
            token=access_token,
            expire_at=now + expires_delta,
            last_login_at=now,
        )

        await redis_set_token(
            username=admin_doc["username"], expires=expires_second, token=access_token
        )

        return {"code": 200, "msg": "登录成功", "data": data}

    except Exception as e:
        raise HTTPException(
            status.HTTP_500_INTERNAL_SERVER_ERROR, f"Database error: {str(e)}"
        )
