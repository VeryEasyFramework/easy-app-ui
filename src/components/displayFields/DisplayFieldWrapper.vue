<template>
  <Container :class="{
    horizontal: direction === 'horizontal',
    vertical: direction === 'vertical'
  }">
    <div class="label">{{ field.label }}</div>
    <div>

      <slot></slot>
    </div>
  </Container>
</template>

<script setup lang="ts">

import type {EasyField} from "@vef/easy-api";
import Container from "@/components/layout/Container.vue";

const props = defineProps<{
  field: EasyField
  direction?: 'horizontal' | 'vertical'
}>()
</script>

<style lang="scss">

.display-field {

  &.horizontal {
    grid-template-columns: 150px 1fr;
  }

  &.vertical {
    grid-template-rows: auto auto;
  }
}
</style>
