from core.redis_client import redis_client


async def redis_set_token(username, expires, token):
    cache_key = f"token:{username}"
    return await redis_client.setex(cache_key, expires, token)
