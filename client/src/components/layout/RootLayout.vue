<template>
  <div class="vh-100 vw-100">

    <slot></slot>

    <NotificationToast/>
  </div>
</template>

<script setup lang="ts">


import NotificationToast from "@/notify/NotificationToast.vue";
</script>

<style lang="scss">
#popovers {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}
</style>
