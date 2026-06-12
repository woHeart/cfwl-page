import express from 'express';
const router = express.Router();
//导入模块
import VideoModel from '../models/VideoModel.js';

router.get('/', async (req, res, next) => {
    try {
        const results = await VideoModel.find({}, {  _id: 0 })
        return res.json({
            code: '200',
            msg: '获取成功',
            data: results[0].video
        })
    } catch (err) {
        next(err)
    }
});

export default router;