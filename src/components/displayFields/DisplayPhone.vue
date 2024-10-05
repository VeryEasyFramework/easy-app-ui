<template>
  <div>
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

<style scoped>

</style>
