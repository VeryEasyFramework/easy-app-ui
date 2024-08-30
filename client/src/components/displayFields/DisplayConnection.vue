<template>
  <div>
    <!--    {{ value }}-->
    {{ titleValue }}
  </div>
</template>

<script setup lang="ts">
import {EasyField} from "@/types/easyField.ts";

const props = defineProps<{
  value: any;
  field?: EasyField
  titleValue?: any
}>()
</script>

<style scoped>

</style>
