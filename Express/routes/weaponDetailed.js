import express from 'express';
const router = express.Router();
//导入模块
import WeaponDetailedModel from '../models/WeaponDetailedModel.js';

router.get('/', async (req, res) => {
    try {
        const { weaponname } = req.query;
        const results = await WeaponDetailedModel.find({ 'baseData.chinese': weaponname }, { _id: 0 })
        // console.log('完整执行阶段：', inspect(results, { depth: null, colors: true }));
        return res.json({
            code: '200',
            msg: '获取成功',
            data: results[0]
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
