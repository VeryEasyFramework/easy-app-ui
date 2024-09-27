<template>
  <Container class="list-detail" :style="maxWidth?`--max-width:${maxWidth}`:``">
    <ContainerPadded class="list" :class="{
      bg: !noBg
    }">

      <slot name="list">List</slot>
    </ContainerPadded>
    <ContainerPadded class="detail" :class="{
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
  .list, .detail {
    border-radius: var(--border-radius);
  }
}
</style>
