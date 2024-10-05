<template>
  <div>
    {{
    time
    }}
  </div>
</template>

<script setup lang="ts">
import type {EasyField} from "@vef/easy-api";
import {DateFormat, getPrettyDate} from "@/utils/index.ts";
import {computed} from "vue";

const props = defineProps<{
  value: any;
  format?: DateFormat;
  showSeconds?: boolean;
  field?: EasyField
}>()

const time = computed(() => {
  if (!props.value) {
    return ''
  }
  return getPrettyDate(props.value, {
    format: props.format || 'pretty',
    showSeconds: props.showSeconds || false
  })
})
</script>

<style scoped>

</style>
