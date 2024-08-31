<template>
  <Container>
    <div class="label">{{ field.label }}</div>
    <slot></slot>
  </Container>
</template>

<script setup lang="ts">

import {EasyField} from "@/types/easyField.ts";
import Container from "@/components/layout/Container.vue";

const props = defineProps<{
  field: EasyField
}>()
</script>

<style scoped>

</style>
