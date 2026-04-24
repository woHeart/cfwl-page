# from app.db import AsyncSessionLocal
#
# async def get_db():
#     # 生成一个新的数据库连接会话
#     db = AsyncSessionLocal()
#     try:
#         yield db  # 把连接交给接口使用
#     finally:
#         await db.close()
