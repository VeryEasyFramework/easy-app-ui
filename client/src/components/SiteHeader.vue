<template>
  <ContainerPadded class="auto-flow-columns justify-content-between align-items-center ">
    <RouterLink to="/">
      <slot name="logo">Logo</slot>
    </RouterLink>
    <slot name="navigation">Navigation</slot>
    <slot name="user">User</slot>
  </ContainerPadded>
</template>
<script setup lang="ts">
import Container from "@/components/layout/Container.vue";
import ContainerPadded from "@/components/layout/ContainerPadded.vue";
</script>
