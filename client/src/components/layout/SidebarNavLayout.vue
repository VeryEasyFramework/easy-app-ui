<template>
  <Container class="side-nav-layout grid-gap-4">
    <div class="side-bar">

      <slot name="sidebar"></slot>
    </div>
    <div class="content">

      <slot name="content"></slot>
    </div>
  </Container>
</template>

<script setup lang="ts">

import Container from "@/components/layout/Container.vue";
</script>

<style lang="scss">
.side-nav-layout {
  grid-template-areas: "side-bar content";
  grid-template-columns: max-content 1fr;

  .side-bar {
    grid-area: side-bar;
  }

  .content {
    grid-area: content;
  }
}
</style>
