import express from "express";
const router = express.Router();
//导入模块
import RoleDetailedModel from "../models/RoleDetailedModel.js";

router.get("/", async (req, res, next) => {
  try {
    const { rolename } = req.query;
    const results = await RoleDetailedModel.find(
      { "baseData.chinese": rolename },
      { _id: 0 },
    );
    return res.json({
      code: "200",
      msg: "获取成功",
      data: results[0],
    });
  } catch (err) {
    next(err);
  }
});

export default router;
