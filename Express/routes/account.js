import express from "express";
const router = express.Router();
//导入模块
import AccountModel from "../models/AccountModel.js";
import HttpError from "../utils/HttpError.js";
//导入token相关模块
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
//哈希密码
import bcrypt from "bcrypt";
const saltRounds = 12;

import get_safedata from "../utils/get_safedate.js";
// import {inspect} from "util";

//注册账号
router.post("/enroll", async (req, res, next) => {
  try {
    const { account, password } = req.body;
    if (await AccountModel.findOne({ account })) {
      throw new HttpError(409, "409", "账号已存在");
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const createAccount = await AccountModel.create({
      account,
      password: hashedPassword,
    });
    const safeDate = get_safedata(createAccount);
    return res.json({
      code: "200",
      msg: "创建成功",
      data: safeDate,
    });
  } catch (err) {
    next(err);
  }
});

//登录账号
router.post("/login", async (req, res, next) => {
  try {
    const { account, password } = req.body;
    const loginAccount = await AccountModel.findOne({ account });
    // console.log('完整执行阶段：', inspect(loginAccount, { depth: null, colors: true }));
    if (!loginAccount) {
      throw new HttpError(401, "401", "账号或密码错误");
    }
    const consistency = await bcrypt.compare(password, loginAccount.password);
    if (consistency) {
      const token = jwt.sign({ id: loginAccount._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      const safeDate = get_safedata(loginAccount);
      return res.json({
        code: "200",
        msg: "登录成功",
        data: { ...safeDate, token },
      });
    }
    throw new HttpError(401, "401", "账号或密码错误");
  } catch (err) {
    next(err);
  }
});

export default router;
