<template>
  <Container class="list-detail">
    <Container>

      <slot name="list">List</slot>
    </Container>
    <Container>
      <slot name="detail">Detail</slot>
    </Container>
  </Container>
</template>

<script setup lang="ts">

import Container from "@/components/layout/Container.vue";
</script>

<style>
.list-detail {
  grid-template-columns: 1fr 2fr;
}
</style>
