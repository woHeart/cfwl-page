import functools
import json
import random
from typing import Any, Callable, Awaitable
from core.redis_client import redis_client


def cache(ttl: int = 300):
    """
    :param ttl: 缓存过期时间（秒）
    """

    def decorator(func: Callable[..., Awaitable[Any]]):
        @functools.wraps(func)
        async def wrapper(*args, **kwargs):
            key_parts = [func.__name__]
            key_parts.extend(str(arg) for arg in args)
            key_parts.extend(f"{k}={v}" for k, v in sorted(kwargs.items()))
            cache_key = ":".join(key_parts)
            print(cache_key)

            cached = await redis_client.get(cache_key)
            if cached:
                print("查询缓存成功")
                return json.loads(cached)

            print("查询缓存失败")
            result = await func(*args, **kwargs)

            if result:
                actual_cet = ttl + random.randint(0, 60)
                await redis_client.setex(
                    cache_key, actual_cet, json.dumps(result, default=str)
                )

            return result

        return wrapper

    return decorator
