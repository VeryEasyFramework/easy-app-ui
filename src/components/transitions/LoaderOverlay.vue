<template>
  <TransitionFade v-if="!loaded">
    <Container
        class="position-absolute top left w-100 h-100 horizontal-align-center vertical-align-center loader-overlay">
      <div class="loader">
        <div class="loader__spinner"></div>
      </div>
    </Container>
  </TransitionFade>
</template>

<script setup lang="ts">
import TransitionFade from "./TransitionFade.vue";
import Container from "@/components/layout/Container.vue";

defineProps<{
  loaded: boolean;
}>();

const emit = defineEmits(["close", "update:modelValue"]);
</script>

<style>

.loader-overlay {

  background-color: rgba(0, 0, 0, 0.5);
  border-radius: var(--border-radius);

}

.loader {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: 10px solid transparent;
  border-top-color: var(--color-primary);
  animation: spin 1s linear infinite;
}

.loader__spinner {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: 10px solid transparent;
  border-top-color: var(--color-secondary);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}


</style>
