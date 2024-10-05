<template>
  <div class="decimal-field">
    {{ formattedValue }}
  </div>
</template>

<script setup lang="ts">
import type {EasyField} from "@vef/easy-api";
import {computed} from "vue";

const props = defineProps<{
  value: any;
  field?: EasyField
}>()

const formattedValue = computed(() => {
  if (props.value == null) {
    return ''
  }
  return parseFloat(props.value).toFixed(2)
})
</script>

<style lang="scss">
.decimal-field {
  font-family: var(--mono-font), monospace;
  color: var(--text-color);
}

</style>
