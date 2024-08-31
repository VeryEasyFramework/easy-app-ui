<template>
  <div>
    {{
      time
    }}
  </div>
</template>

<script setup lang="ts">
import {EasyField} from "@/types/easyField.ts";
import {getPrettyDate} from "@/utils/index.ts";
import {computed} from "vue";

const props = defineProps<{
  value: any;
  field?: EasyField
}>()

const time = computed(() => {
  return getPrettyDate(props.value, {
    format: 'pretty'
  })
})
</script>

<style scoped>

</style>
