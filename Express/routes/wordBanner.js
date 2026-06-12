import express from 'express';
const router = express.Router();
//导入模块
import WordBannerModel from '../models/WordBannerModel.js'

router.get('/', async (req, res, next) => {
    try {
        const results = await WordBannerModel.find({}, {  _id: 0 });
        const data = results.map(item => item.url);
        return res.json({
            code: '200',
            msg: '获取成功',
            data: data
        })
    } catch (err) {
        next(err);
    }
})

export default router;