<template>
  <div class="logo" :style="`width:${width||'100px'}`">
    <img src="/logo.png" alt="logo"/>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  width?: string;
  height?: string;
}>()
</script>

<style lang="scss" scoped>
.logo {


  img {
    width: 100%;
  }
}
</style>
