<template>
  <Container class="list-detail" :style="maxWidth?`--max-width:${maxWidth}`:``">
    <ContainerPadded :class="{
      bg: !noBg
    }">

      <slot name="list">List</slot>
    </ContainerPadded>
    <ContainerPadded :class="{
      bg: !noBg
    }">
      <slot name="detail">Detail</slot>
    </ContainerPadded>
  </Container>
</template>

<script setup lang="ts">

import Container from "@/components/layout/Container.vue";
import ContainerPadded from "@/components/layout/ContainerPadded.vue";

defineProps<{
  maxWidth?: string
  noBg?: boolean
}>()
</script>

<style>
.list-detail {
  --max-width: 1fr;
  grid-template-columns: minmax(min-content, var(--max-width) ) 1fr;
}
</style>
