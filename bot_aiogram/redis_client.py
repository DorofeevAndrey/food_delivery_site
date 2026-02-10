import redis.asyncio as redis
from config import settings

REDIS_URL = f"redis://{settings.REDIS_HOST}:{settings.REDIS_PORT}/0"


r = redis.from_url(REDIS_URL, decode_responses=True)