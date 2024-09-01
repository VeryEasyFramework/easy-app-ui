<template>
  <Container>
    <CardWidget class="dark">
      <div v-for="color in colors" :key="color">
        {{ color }}
      </div>
    </CardWidget>
    <CardWidget>

    </CardWidget>
  </Container>
</template>

<script setup lang="ts">

import Container from "@/components/layout/Container.vue";
import CardWidget from "@/components/widgets/CardWidget.vue";

const colors = [
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
  'info',
]

const modifiers = [
  'dark',
  'darker',
  'bright',
  'brighter',
]

</script>

<style scoped>

</style>
