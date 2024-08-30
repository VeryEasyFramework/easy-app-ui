<template>
  <RouterView v-slot="{ Component }">
    <transition appear mode="out-in" :name="fast ? 'fast' : 'simple-fade'">
      <component :is="Component" :key="transitionKey as string" />
    </transition>
  </RouterView>
</template>

<script lang="ts" setup>
/**
 * @param {string} [transitionKey]
 * @param {boolean} [fill]
 */
const props = defineProps<{
  transitionKey?: string;
  fast?: boolean;
}>();
</script>

<style scoped>
.simple-fade-enter-active,
.simple-fade-leave-active {
  /* transition: opacity 0.3s cubic-bezier(0.7, 0, 0.34, 0.99); */
  transition: opacity var(--snap-ease);
}
.fast-enter-active,
.fast-leave-active {
  transition: opacity 0.1s cubic-bezier(0.7, 0, 0.34, 0.99);
}

.fast-enter-from,
.fast-leave-to,
.simple-fade-enter-from,
.simple-fade-leave-to {
  opacity: 0;
}
</style>
