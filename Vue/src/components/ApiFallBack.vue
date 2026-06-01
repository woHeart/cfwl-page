<script setup lang="ts" generic="T, D = undefined">
import { handleCatchError } from '@/utils/error';
import { AxiosError } from 'axios';
import { onMounted, ref } from 'vue'

const { asyncFn, params } = defineProps<{
  asyncFn: (...args: D extends undefined ? [] : [data: D]) => Promise<T>,
  params?: D
}>()

const data = ref<T | null>(null)
const error = ref<Error | AxiosError | null>(null)
const loading = ref<boolean>(false)

async function execute() {
  loading.value = true
  error.value = null
  try {
    if (params === undefined) {
      data.value = await (asyncFn as () => Promise<T>)()
    } else {
      data.value = await (asyncFn as (data: D) => Promise<T>)(params)
    }
  } catch (err: unknown) {
    error.value = err as Error | AxiosError
    handleCatchError(error.value)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  execute()
})
</script>

<template>
  <slot v-if="loading" name="loading" />
  <slot v-else-if="error" name="error" :retry="execute" />
  <slot v-else :data="data" />
</template>
