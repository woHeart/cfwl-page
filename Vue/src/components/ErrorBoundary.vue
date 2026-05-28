<!-- src/components/ErrorBoundary.vue -->
<script setup>
import { ref, onErrorCaptured, computed } from 'vue'

const error = ref(null) // 存储捕获到的错误

/**
 * 捕获子孙组件抛出的所有错误
 * @param {Error} err - 错误对象
 * @param {VueComponent} instance - 发生错误的组件实例
 * @param {string} info - 错误信息，如 'render function'
 * @returns {boolean} - 返回 false 可阻止错误继续向上传播
 */
onErrorCaptured((err, instance, info) => {
    console.error(`错误边界捕获到异常: ${info}`, err)
    error.value = err

    // 返回 false 可以阻止错误继续向上冒泡
    // 如果你有全局错误处理器，可能不希望完全阻止，可以根据情况决定
    // return false
})

// 清除错误状态，用于重试
const clearError = () => {
    error.value = null
}

// 是否有错误发生
const hasError = computed(() => error.value !== null)

// 暴露状态和方法给父组件或插槽使用
defineExpose({
    clearError,
    hasError,
    error
})
</script>

<template>
    <!-- 如果发生错误，渲染错误插槽；否则渲染默认插槽 -->
    <slot v-if="!error" name="default"></slot>
    <slot v-else name="error" :error="error" :clear-error="clearError"></slot>
</template>