import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "node:path";
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,        // 打包后自动打开分析报告
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html', // 报告输出位置
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 别名@指向src
    },
  },
})
