<template>
  <TransitionFade>
    <div class="loader" v-if="!loaded">loading</div>
    <slot v-else></slot>
  </TransitionFade>
</template>

<script setup lang="ts">
import TransitionFade from "./TransitionFade.vue";

defineProps<{
  loaded: boolean;
}>();

const emit = defineEmits(["close", "update:modelValue"]);
</script>

<style scoped></style>
