<template>
  <TransitionGroup :name="fade ? 'list-fade' : 'list'">
    <slot> </slot>
  </TransitionGroup>
</template>

<script setup lang="ts">
const props = defineProps<{
  fade?: boolean;
}>();
</script>

<style>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.list-enter-from {
  opacity: 0;
  transform: translateX(30%);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30%);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
}

.list-fade-move, /* apply transition to moving elements */
.list-fade-enter-active,
.list-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.list-fade-enter-from {
  opacity: 0;
}

.list-fade-leave-to {
  opacity: 0;
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-fade-leave-active {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
