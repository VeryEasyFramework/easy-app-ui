<template>
  <div>
    {{ props.value }}
  </div>
</template>

<script setup lang="ts">
import {EasyField} from "@/types/easyField.ts";

const props = defineProps<{
  value: any;
  field?: EasyField
}>()
</script>

<style scoped>

</style>
