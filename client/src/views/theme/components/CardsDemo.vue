<template>
  <Container class="card-demo">
    <div class="title-4">Cards</div>
    <Container class="auto-row">
      <CardWidget>
        <div>Card</div>
      </CardWidget>
      <CardWidget class="dark">
        <div>Card Dark</div>
      </CardWidget>
      <CardWidget class="body">
        <div>Card Body</div>
      </CardWidget>
    </Container>
  </Container>
</template>

<script setup lang="ts">

import Container from "@/components/layout/Container.vue";
import CardWidget from "@/components/widgets/CardWidget.vue";
</script>

<style>
.card-demo {
  grid-template-rows:max-content auto;
}
</style>
