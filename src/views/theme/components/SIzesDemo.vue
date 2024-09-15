<template>
  <CardWidget>

    <Container class="row shrink">
      <div class="title-4">Sizing</div>
      <Container class="col shrink">
        <div class="bold">Border Radius:</div>
        <div class="border-demo">
        </div>
      </Container>
      <Container class="col shrink">
        <div class="bold">Font Size:</div>
        <div class="font-demo">
        </div>
      </Container>
    </Container>
  </CardWidget>
</template>

<script setup lang="ts">

import Container from "@/components/layout/Container.vue";
import CardWidget from "@/components/widgets/CardWidget.vue";
</script>

<style lang="scss">
@import "@/style";

.border-demo {
  &:after {
    content: '#{$border-radius}';
  }
}

.font-demo {
  &:after {
    content: '#{$font-size}';
  }
}
</style>
