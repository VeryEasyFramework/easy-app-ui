<template>
  <Container class="list-detail">
    <slot name="list">List</slot>
    <slot name="detail">Detail</slot>
  </Container>
</template>

<script setup lang="ts">

import Container from "@/components/layout/Container.vue";
</script>

<style>
list-detail {
  grid-template-columns: 1fr 2fr;
}
</style>
