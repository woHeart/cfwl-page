import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 清除默认样式
import 'reset-css'; // 或 import 'reset.css';

// 图片懒加载
import lazyPlugin from 'vue3-lazyload'

import 'element-plus/dist/index.css'
import { ElMessage } from 'element-plus'
// import VueLazy from 'vue3-lazy'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(ElMessage)

app.use(lazyPlugin, {
  preLoad: 1.2, // 预加载高度比例为图片0.2
  loading: new URL('@/assets/images/loading.png', import.meta.url).href,
  error: new URL('@/assets/images/error.png', import.meta.url).href
})

app.mount('#app')
