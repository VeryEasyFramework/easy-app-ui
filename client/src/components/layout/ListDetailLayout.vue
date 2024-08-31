<template>
  <Container class="list-detail">
    <ContainerPadded class="bg border">

      <slot name="list">List</slot>
    </ContainerPadded>
    <ContainerPadded class="bg border">
      <slot name="detail">Detail</slot>
    </ContainerPadded>
  </Container>
</template>

<script setup lang="ts">

import Container from "@/components/layout/Container.vue";
import ContainerPadded from "@/components/layout/ContainerPadded.vue";
</script>

<style>
.list-detail {
  grid-template-columns: 1fr 2fr;
}
</style>
