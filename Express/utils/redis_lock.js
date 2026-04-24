import { randomUUID } from 'crypto';

class RedisDistributedLock {

  static generateRequestId() {
    return randomUUID() + ':' + (process.pid || '');
  }

  /**
   * 尝试获取分布式锁
   * @param {Redis} redis      ioredis 实例（由调用方传入）
   * @param {string} lockKey   锁的键
   * @param {string} requestId 唯一标识
   * @param {number} expireMs  锁过期时间（毫秒）
   * @returns {Promise<boolean>}
   */
  static async tryLock(redis, lockKey, requestId, expireMs) {
    // SET key value NX PX expireMs
    const result = await redis.set(lockKey, requestId, 'PX', expireMs, 'NX');
    return result === 'OK';
  }

  /**
   * 释放分布式锁（原子操作）
   * @param {Redis} redis      ioredis 实例
   * @param {string} lockKey   锁的键
   * @param {string} requestId 唯一标识（防止误删）
   * @returns {Promise<boolean>}
   */
  static async releaseLock(redis, lockKey, requestId) {
    // Lua 脚本保证「判断 + 删除」原子性
    const script = `
      if redis.call('get', KEYS[1]) == ARGV[1] then
        return redis.call('del', KEYS[1])
      else
        return 0
      end
    `;
    const result = await redis.eval(script, 1, lockKey, requestId);
    return result === 1;
  }

  /**
   * 续期锁（仅当 value 匹配时延长过期时间）
   * @param {Redis} redis
   * @param {string} lockKey
   * @param {string} requestId
   * @param {number} renewMs 续期时长（毫秒）
   * @returns {Promise<boolean>}
   */
  static async renewLock(redis, lockKey, requestId, renewMs) {
    const script = `
      if redis.call('get', KEYS[1]) == ARGV[1] then
        return redis.call('pexpire', KEYS[1], ARGV[2])
      else
        return 0
      end
    `;
    const result = await redis.eval(script, 1, lockKey, requestId, renewMs);
    return result === 1;
  }
}

export default RedisDistributedLock;