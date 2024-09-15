<template>
  <Container class="col-2 vertical-align-start">
    <Container class="row shrink">
      <ColorSwatch/>
      <SIzesDemo/>
    </Container>
    <CardsDemo/>
  </Container>
</template>

<script setup lang="ts">

import Container from "@/components/layout/Container.vue";
import ColorSwatch from "@/views/theme/components/ColorSwatch.vue";
import CardsDemo from "@/views/theme/components/CardsDemo.vue";
import SIzesDemo from "@/views/theme/components/SIzesDemo.vue";
</script>

<style lang="scss">


</style>
