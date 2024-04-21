<template>
  <div class="m-datepicker">
    <VueDatePicker
      :month-change-on-scroll="false"
      :enable-time-picker="props.showTime"
      auto-apply
      text-input
      :model-type="props.modelType"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { defineProps } from 'vue'

const props = defineProps<{
  showTime?: boolean
  modelType?: 'timestamp' | 'format'
}>()

defineExpose({ props })
</script>

<style scoped>
.m-datepicker {
  width: 100%;
  display: inline-block;
}
:deep(.dp__theme_light) {
  --dp-primary-color: var(--vt-c-green) !important;
}
</style>
