import redisClient from "../redis/redis.js";

const cacheDecorator = (expireSeconds = 300) => {
  return async (req, res, next) => {
    try {
      const randomExp = Math.floor(Math.random() * 31) + expireSeconds;
      const allParams = { ...req.params, ...req.query, ...req.body };
      const sortedParams = Object.keys(allParams)
        .sort()
        .map((key) => `${key}=${String(allParams[key])}`)
        .join(":");
      const fullPath = req.baseUrl + req.path;
      const pathWithColon = fullPath
        .replace(/^\/+|\/+$/g, "")
        .replace(/\//g, ":");
      const redisKey = sortedParams
        ? `${pathWithColon}:${sortedParams}`
        : pathWithColon;
      const cacheData = await redisClient.get(redisKey);
      if (cacheData) {
        res.json(JSON.parse(cacheData));
        console.log("redis读取缓存:" + redisKey);
        return;
      }

      const originalJson = res.json;
      res.json = async function (body) {
        if (body.code === "200") {
          redisClient
            .setex(redisKey, randomExp, JSON.stringify(body))
            .catch((err) => console.error("写入缓存失败:", err));
          console.log("无缓存,查询数据库后存入Redis:", redisKey);
        } else if (body.code !== "000") {
          redisClient
            .setex(redisKey, 30, "-1")
            .catch((err) => console.error("写入缓存失败:", err));
          console.log("无缓存,查询数据库后存入Redis:", redisKey);          
        }
        return originalJson.call(this, body);
      };
      next();
    } catch (err) {
      console.error("装饰器缓存异常:", err);
      next();
    }
  };
};

export default cacheDecorator;
