import Redis from 'ioredis';

const redisClient = new Redis({
  host: 'redis',
  port: 6379,
  password: '',
  connectTimeout: 5000,
  maxRetriesPerRequest: 10,
  retryOnTimeout: true,
  stringNumbers: true
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
})

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
})

export default redisClient;