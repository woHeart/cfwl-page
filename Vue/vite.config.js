import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

//Element
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
//Naive-ui
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'

import { createRequire } from 'node:module'

import { visualizer } from 'rollup-plugin-visualizer'

const require = createRequire(import.meta.url) // 创建require函数

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // 监听局域网内所有 IP（关键）
    port: 5173, // 保持默认端口（可修改，需确保未被占用）
    open: false, // 启动时是否自动打开浏览器（可选，关闭避免本地弹窗）
  },
  plugins: [
    vue(),
    vueDevTools(),
    //Element
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        },
      ],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver(), IconsResolver(), NaiveUiResolver()],
    }),
    Icons(),
    visualizer({
      open: true, // 打包完成后，自动在浏览器中打开分析报告
      gzipSize: true, // 显示 Gzip 压缩后的大小，更接近网络传输的真实体积
      brotliSize: true, // 显示 Brotli 压缩后的大小
      filename: 'dist/stats.html', // 分析报告输出路径
    }),
  ],
  test: {
    environment: 'jsdom',
    server: {
      deps: {
        inline: ['element-plus'] // 内联处理 element-plus 的 CSS
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    postcss: {
      plugins: [
        // 配置 postcss-px-to-viewport 插件
        require('postcss-px-to-viewport')({
          viewportWidth: 1536, // 设计稿宽度
          unitPrecision: 2, // 保留小数位数
          viewportUnit: 'vw', // 转换为 vw 单位
          selectorBlackList: [], // 不转换的类名（如不需要可留空）
          minPixelValue: 1, // 小于 1px 不转换
          mediaQuery: false, // 不转换媒体查询中的 px
        }),
      ],
    },
  },
})
