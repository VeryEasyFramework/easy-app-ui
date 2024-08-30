<template>
  <Transition :appear="appear" :mode="mode || 'out-in'" :name="type || 'fade'">
    <slot></slot>
  </Transition>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  mode?: "out-in" | "in-out";
  type?: "fade" | "slide" | "slide-left" | "slide-right";
  speed?: "slow" | "fast" | "normal";
  appear?: boolean;
}>();

const transitionSpeed = computed(() => {
  switch (props.speed) {
    case "slow":
      return "0.7s";
    case "fast":
      return "0.1s";
    default:
      return "0.3s";
  }
});
</script>

<style>
.fade-enter-active {
  transition: opacity v-bind(transitionSpeed) var(--ease);
}

.fade-leave-active {
  transition: opacity v-bind(transitionSpeed) var(--ease);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-right-enter-active,
.slide-left-enter-active,
.slide-leave-active,
.slide-right-leave-active,
.slide-left-leave-active {
  transition: all v-bind(transitionSpeed) var(--ease);
}

.slide-enter-from,
.slide-leave-to,
.slide-right-enter-from,
.slide-left-leave-to {
  transform: translateX(-120%);
}

.slide-right-leave-to,
.slide-left-enter-from {
  transform: translateX(120%);
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>
