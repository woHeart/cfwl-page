# from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
# from sqlalchemy.orm import sessionmaker
#
# # -------------------------- 数据库连接配置 --------------------------
# # 数据库地址：异步SQLite（上线可替换为 mysql+asyncmy / postgresql+asyncpg）
# DATABASE_URL = "sqlite+aiosqlite:///./test.db"
#
# # 创建异步数据库引擎：相当于数据库的"总开关"，负责建立连接
# async_engine = create_async_engine(
#     DATABASE_URL,
#     echo=False,        # 生产环境关闭SQL日志（避免泄露敏感信息）
#     future=True        # 启用SQLAlchemy 2.x 新特性（必须加，否则无法使用Mapped语法）
# )
#
# # 创建异步会话工厂：用来批量生成数据库连接会话
# AsyncSessionLocal = sessionmaker(
#     bind=async_engine,       # 绑定到上面的异步引擎
#     class_=AsyncSession,     # 指定使用异步会话（生产级必须用异步，支持高并发）
#     expire_on_commit=False   # 提交后不失效，避免数据丢失
# )

from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = "mongodb://admin:secret@mongodb:27017/cfwl?authSource=admin"
DB_NAME = "cfwl"


class MongoDB:
    client: AsyncIOMotorClient = None
    db = None

    @classmethod
    async def connect(cls):
        cls.client = AsyncIOMotorClient(
            MONGO_URL,
            maxPoolSize=50,  # 最大连接数，默认100
            minPoolSize=10,
        )
        cls.db = cls.client[DB_NAME]
        await cls.client.admin.command("ping")
        print("Connected to MongoDB")

    @classmethod
    async def close(cls):
        if cls.client:
            cls.client.close()
            print("MongoDB connection closed")


async def get_db():
    return MongoDB.db
