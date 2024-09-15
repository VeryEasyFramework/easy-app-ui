<template>
  <CardWidget>
    <Container class="titled-container">
      <div class="title-4">{{ title }}</div>
      <slot>

      </slot>
    </Container>
  </CardWidget>
</template>

<script setup lang="ts">

import CardWidget from "@/components/widgets/CardWidget.vue";
import Container from "@/components/layout/Container.vue";

defineProps<{
  title: string
}>()
</script>

<style lang="scss">

.titled-container {
  grid-template-rows: max-content 1fr;

  .title-4 {
    width: max-content;
    border-bottom: 2px solid var(--color-primary-darker);
    
  }
}

</style>
