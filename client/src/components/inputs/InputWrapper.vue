<template>
  <Container
      class="input grid-gap-0"
      :rows="['max-content', 'max-content', 'minmax(1rem,max-content)']"
      :class="{ readonly: readOnly }">
    <label class="text-small pb-1">
      <span>{{ label }}</span>
      <span v-if="required" class="ps-1 text-error">*</span>
    </label>
    <slot></slot>
    <div v-if="error" class="error-message">{{ error }}</div>
  </Container>
</template>

<script setup lang="ts">


import Container from "@/components/layout/Container.vue";

const props = defineProps<{
  label?: string;
  error?: string;
  required?: boolean;
  readOnly?: boolean;
}>();
</script>
