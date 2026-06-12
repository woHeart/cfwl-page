import express from 'express';
const router = express.Router();
//导入模块
import AtlasModel from '../models/AtlasModel.js'

router.get('/', async (req, res, next) => {
    try {
        const { page } = req.query
        const limit = 16;
        const skip = (page - 1) * limit;
        const results = (await AtlasModel.find({}, {  _id: 0 }).sort({ _id: -1 }).limit(limit).skip(skip)).map(item => item.url);
        const total = await AtlasModel.countDocuments();
        return res.json({
            code: '200',
            msg: '获取成功',
            data: {
                results,
                isMore: page * limit < total
            }
        })
    } catch (err) {
        next(err)
    }
});

export default router;