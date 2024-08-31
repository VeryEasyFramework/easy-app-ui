<template>
  <ContainerPadded class="col shrink vertical-align-center cursor-pointer">

    <div class="header-logo">


    </div>
    <div class="title-5">

      <slot>
        Easy App
      </slot>
    </div>
  </ContainerPadded>
</template>

<style lang="scss">
.header-logo {
  height: 1rem;
  width: 1rem;
  background-image: url('/logo.png');
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
<script setup lang="ts">
import Container from "@/components/layout/Container.vue";
import ContainerPadded from "@/components/layout/ContainerPadded.vue";
</script>
