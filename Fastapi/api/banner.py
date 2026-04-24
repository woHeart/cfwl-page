import asyncio
import uuid
from core.redis_client import redis_client
from fastapi import APIRouter, HTTPException, status
from schemas.banner import BannerResponse
from app.db import MongoDB
from core.decorators import cache

router = APIRouter()


@router.get("", response_model=BannerResponse, response_model_exclude_unset=True)
@cache(ttl=60)
async def get_banner(max_retries: int = 3):
    db = MongoDB().db

    lock_key = "lock:banner:list"
    lock_value = str(uuid.uuid4())

    locked = await redis_client.set(lock_key, lock_value, nx=True, ex=3)

    if locked:
        try:
            banner_list = await db.word_banners.find().to_list(length=None)

            if not banner_list:
                return {
                    "code": 404,
                    "msg": "查询失败",
                    "data": [],
                }

            return {"code": 200, "msg": "查询成功", "data": banner_list}

        except Exception as e:
            raise HTTPException(
                status.HTTP_500_INTERNAL_SERVER_ERROR, f"Database error: {str(e)}"
            )

        finally:
            unlock_script = """        
                if redis.call('get', KEYS[1]) == ARGV[1] then        
                    return redis.call('del', KEYS[1])        
                else
                    return 0       
                end    
            """

            await redis_client.eval(
                unlock_script,  # 第一个参数：要执行的Lua脚本字符串
                1,  # 第二个参数：KEYS类型参数的个数（固定写1）
                lock_key,  # 第三个参数：KEYS[1] 对应的锁的key
                lock_value,  # 第四个参数：ARGV[1] 对应的锁的唯一值
            )

    else:
        if max_retries <= 0:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="服务繁忙，请稍后重试",
            )

        await asyncio.sleep(1)

        return await get_banner(max_retries=max_retries - 1)
