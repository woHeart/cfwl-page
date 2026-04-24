import { z } from "zod";

// 🔥 正确：这是一个【Zod Schema】，不是普通函数！
const parseStr = z.preprocess(
  (data: string) => {
    try {
        return JSON.parse(data);
    } catch (e) {
      throw new Error(`转换失败：${e}`);
    }
  },
  z.record(z.string(), z.string())
);

export default parseStr;