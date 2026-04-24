from redis.asyncio import Redis

redis_client = Redis(
    host="redis",
    port=6379,
    db=0,
    password=None,
    decode_responses=True,
    max_connections=10,
    socket_timeout=5,
    retry_on_timeout=True,
)
