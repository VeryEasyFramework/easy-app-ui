<template>
  <Container class="col fit max-content align-items-center">

    <div class="header-logo">

      <img alt="EasyApp" src="/logo.png">
    </div>
    <div>

      <slot>
        Easy App
      </slot>
    </div>
  </Container>
</template>

<style lang="scss">
.header-logo {
  height: 2rem;

  img {
    height: 100%;
  }
}
</style>
<script setup lang="ts">
import Container from "@/components/layout/Container.vue";
</script>
