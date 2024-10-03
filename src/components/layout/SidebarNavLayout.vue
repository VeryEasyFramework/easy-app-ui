<template>
  <Container class="side-nav-layout gap-0">
    <div class="side-bar">

      <slot name="sidebar"></slot>
    </div>
    <div class="content p-2">

      <slot name="content"></slot>
    </div>
  </Container>
</template>

<script setup lang="ts">

import Container from "@/components/layout/Container.vue";
import ContainerPadded from "@/components/layout/ContainerPadded.vue";
</script>

<style lang="scss">
.side-nav-layout {
  grid-template-areas: "side-bar content";
  grid-template-columns: max-content 1fr;


  .side-bar {
    grid-area: side-bar;
    width: max-content;

  }

  .content {
    grid-area: content;
  }
}
</style>
