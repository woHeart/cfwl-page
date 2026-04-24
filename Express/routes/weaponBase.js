import express from 'express';
const router = express.Router();
//导入模块
import WeaponBaseModel from '../models/WeaponBaseModel.js';

router.get('/', async (req, res) => {
    try {
        const results = await WeaponBaseModel.find({}, { _id: 0 });

        return res.json({
            code: '200',
            msg: '获取成功',
            data: results
        })
    } catch (err) {
        res.json({
            code: '500',
            msg: '获取失败',
            data: null
        })
        console.log(err);
    }
});

export default router;
