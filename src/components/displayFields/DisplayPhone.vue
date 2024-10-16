<template>
  <div>
    {{ props.value }}
  </div>
</template>

<script setup lang="ts">
import type {EasyField} from "@vef/types";

const props = defineProps<{
  value: any;
  field?: EasyField
}>()
</script>

<style scoped>

</style>
