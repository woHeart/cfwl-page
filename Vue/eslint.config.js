import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import js from '@eslint/js'
import vue from 'eslint-plugin-vue' // 只导入一次即可
import ts from 'typescript-eslint'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
    languageOptions: {
      parser: vue.parser,
      parserOptions: {
        parser: ts.parser,
      },
    },
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  // 各插件的推荐配置
  js.configs.recommended, // 对象，直接放入数组
  ...ts.configs.recommended, // 数组，需要展开
  ...vue.configs['flat/essential'], // 数组，需要展开
  skipFormatting, // 禁用格式规则

  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
])
