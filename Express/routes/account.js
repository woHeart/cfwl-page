import express from 'express';
const router = express.Router();
//导入模块
import AccountModel from '../models/AccountModel.js'
//导入token相关模块
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
//哈希密码
import bcrypt from 'bcrypt';
const saltRounds = 12;

import get_safedata from '../utils/get_safedate.js'
// import {inspect} from "util";

//注册账号
router.post('/enroll', async (req, res) => {
    try {
        const { account, password } = req.body
        if (await AccountModel.findOne({ account })) {
            return res.json({
                conde: '409',
                msg: '账号已存在',
                data: null
            })
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const createAccount = await AccountModel.create({
            account,
            password: hashedPassword
        })
        const safeDate = get_safedata(createAccount)
        return res.json({
            code: '200',
            msg: '创建成功',
            data: safeDate
        })
    } catch (err) {
        res.json({
            code: '500',
            msg: '创建失败',
            data: null
        })
        console.log(err);
    }
})

//登录账号
router.post('/login', async (req, res) => {
    try {
        const { account, password } = req.body
        const loginAccount = await AccountModel.findOne({ account })
        // console.log('完整执行阶段：', inspect(loginAccount, { depth: null, colors: true }));
        if (!loginAccount) {
            return res.json({
                code: '401',
                msg: '账号或密码错误',
                data: null
            })    
        }
        const consistency = await bcrypt.compare(password, loginAccount.password);
        if (consistency) {
            const token = jwt.sign(
                { id: loginAccount._id },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            )
            const safeDate = get_safedata(loginAccount)
            return res.json({
                code: '200',
                msg: '登录成功',
                data: {...safeDate, token}                    
            })
        }
        return res.json({
            code: '401',
            msg: '账号或密码错误',
            data: null
        })        
    } catch (err) {
        res.json({
            code: '500',
            msg: '登录失败',
            data: null
        })
        console.log(err)
    }
})

export default router