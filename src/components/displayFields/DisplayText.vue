<template>
  <div class="text-field">
    {{ props.value }}
  </div>
</template>

<script setup lang="ts">
import type {EasyField} from "@vef/easy-api";

const props = defineProps<{
  value: any;
  field?: EasyField
}>()
</script>

<style lang="scss">
.text-field {
  white-space: break-spaces;
  word-wrap: break-word;
  word-break: break-all;
  max-width: 100px;
  height: max-content;

}
</style>
