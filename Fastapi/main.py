# from fastapi import FastAPI
# import uvicorn
# from contextlib import asynccontextmanager
# from app.db import async_engine
# from api.admin_login import router as admin_login_router
# from models.Base import Base
# from fastapi.middleware.cors import CORSMiddleware
#
#
# # -------------------------- 数据库生命周期：启动时创建表 --------------------------
# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     # 启动时：创建所有表（Base.metadata.create_all 会根据模型生成表结构）
#     async with async_engine.begin () as conn:
#         await conn.run_sync (Base.metadata.create_all)
#     yield  # 等待服务运行
#     # 关闭时：释放数据库引擎连接
#     await async_engine.dispose ()
#
#
# # -------------------------- 创建FastAPI应用 --------------------------
# app = FastAPI (
#     title = "生产级FastAPI项目",
#     version = "1.0",
#     description = "完整版：包含测试接口 + 用户CRUD接口（SQLAlchemy 2.x 新版写法）",
#     lifespan = lifespan  # 注册生命周期事件（自动创建表）
# )
#
# origins = [
#     "http://localhost:5173",  # 你的前端地址（Vite 默认端口 5173）
# ]
#
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,  # 允许的跨域源（前端域名）
#     allow_credentials=True,  # 关键：允许携带 Cookie/Token（前后端传 token 必备）
#     allow_methods=["*"],     # 允许所有请求方法（GET/POST/PUT/DELETE/OPTIONS 等）
#     allow_headers=["*"],     # 允许所有请求头（如 Content-Type、Authorization 等）
#     max_age=86400,           # 预检请求（OPTIONS）的缓存时间（秒），避免重复发送 OPTIONS 请求
# )
#
# # -------------------------- 根接口 --------------------------
# @app.get ("/", summary = "根接口")
# async def root():
#     return {"message": "服务启动成功！"}
#
#
# # -------------------------- 注册版本路由 --------------------------
# app.include_router (admin_login_router, prefix = "/api/admin", tags = ["管理员登录"])
#
# # -------------------------- 启动服务 --------------------------
# if __name__ == "__main__":
#     uvicorn.run (
#         "main:app",  # 入口文件：main.py里的app对象
#         host = "0.0.0.0",  # 允许局域网内其他设备访问
#         port = 8000,  # 服务监听端口
#         reload = True  # 开发环境：修改代码后自动重启（生产环境需关闭）
#     )

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uvicorn

from app.db import MongoDB
from api.admin_login import router as admin_login_router
from api.menu import router as menu_router
from api.atlas import router as atlas_router
from api.music import router as music_router
from api.video import router as video_router
from api.role_base import router as role_base_router
from api.weapon_base import router as weapon_base_router
from api.weapon_detailed import router as weapon_detailed_router
from api.role_detailed import router as role_detailed_router
from api.banner import router as banner_router
from core.redis_client import redis_client
from middleware.verify_token import AuthMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):
    await MongoDB.connect()
    await redis_client.ping()
    print("Mongodb和Redis连接成功")
    yield
    await MongoDB.close()
    await redis_client.close()
    print("Mongodb和Redis关闭成功")


app = FastAPI(title="FastAPI + MongoDB", lifespan=lifespan)

origins = ["http://localhost:5173", "http://127.0.0.1:5173"]

app.add_middleware(AuthMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    max_age=86400,
)


@app.get("/")
async def root():
    return {"message": "服务启动成功！"}


app.include_router(admin_login_router, prefix="/admin", tags=["管理员登录"])
app.include_router(menu_router, prefix="/menu", tags=["菜单"])
app.include_router(atlas_router, prefix="/atlas", tags=["图集"])
app.include_router(music_router, prefix="/music", tags=["音乐"])
app.include_router(video_router, prefix="/video", tags=["视频"])
app.include_router(role_base_router, prefix="/roleBase", tags=["角色列表"])
app.include_router(weapon_base_router, prefix="/weaponBase", tags=["心相列表"])
app.include_router(weapon_detailed_router, prefix="/weaponDetailed", tags=["心相详情"])
app.include_router(role_detailed_router, prefix="/roleDetailed", tags=["角色详情"])
app.include_router(banner_router, prefix="/banner", tags=["轮播图"])

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
    )
