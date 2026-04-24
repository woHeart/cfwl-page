/**
 *
 * @param {*} success
 * @param {*} error
 */

// 连接数据库
import mongoose from "mongoose";

const mongodbClient = async () => {
  try {
    await mongoose.connect(
      "mongodb://admin:secret@mongodb:27017/cfwl?authSource=admin",
      {
        serverSelectionTimeoutMS: 5000, // 5秒连接超时，立即失败
        maxPoolSize: 2,
      },
    );
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};
export default mongodbClient;
