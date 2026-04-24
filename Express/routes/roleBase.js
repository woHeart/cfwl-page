import express from "express";
const router = express.Router();
//导入模块
import RoleBaseModel from "../models/RoleBaseModel.js";
import redisClient from "../redis/redis.js";
import RedisDistributedLock from "../utils/redis_lock.js";

router.get("/", async (req, res) => {
  const lockKey = "role:base:lock";
  const requestId = RedisDistributedLock.generateRequestId();
  const expireMs = 30000;

  const lock = await RedisDistributedLock.tryLock(
    redisClient,
    lockKey,
    requestId,
    expireMs,
  );

  if (!lock) {
    console.log("锁获取失败，请稍后再试");
    return res.json({
        code: "000",
        msg: "请稍后再试",
        data: "-1"
    });
  }

  try {
    console.log("获取锁成功，执行业务逻辑");
    const results = await RoleBaseModel.find({}, { _id: 0 });
    return res.json({
      code: "200",
      msg: "获取成功",
      data: results,
    });
  } catch (err) {
    res.json({
      code: "500",
      msg: "获取失败",
      data: null,
    });
    console.log(err);
  } finally {
    await RedisDistributedLock.releaseLock(redisClient, lockKey, requestId);
    console.log("删除锁成功！");
  }
});

export default router;
