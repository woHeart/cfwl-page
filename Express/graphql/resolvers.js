// graphql/resolvers.js
import MusicModel from '../models/MusicModel.js';

export const resolvers = {
  Query: {
    getAllMusic: async () => {
      try {
        const results = await MusicModel.find({}, { _id: 0 }).lean();
        return results?.[0]?.music || [];
      } catch (err) {
        console.error('GraphQL Error:', err);
        throw new Error('获取音乐列表失败', err);
      }
    },
  },
};