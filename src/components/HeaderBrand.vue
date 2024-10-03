<template>
  <Container class="col shrink vertical-align-center cursor-pointer">

    <div class="header-logo">


    </div>
    <div v-if="!collapse" class="title-5">

      <slot>
        Easy App
      </slot>
    </div>
  </Container>
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
import ContainerPadded from "@/components/layout/ContainerPadded.vue";
import Container from "@/components/layout/Container.vue";

const props = defineProps<{
  collapse?: boolean
}>()
</script>
