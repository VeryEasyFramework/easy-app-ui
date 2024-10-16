<template>
  <div class="int-field">
    {{ formattedValue }}
  </div>
</template>

<script setup lang="ts">
import type {EasyField} from "@vef/types";
import {computed} from "vue";

const props = defineProps<{
  value: any;
  field?: EasyField
}>()

const formattedValue = computed(() => {
  if (props.value == null) {
    return ''
  }
  return props.value
})
</script>

<style lang="scss">
.int-field {
  font-family: var(--mono-font), monospace;
  color: var(--text-color);
}
</style>
