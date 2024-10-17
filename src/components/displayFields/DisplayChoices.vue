<template>
  <div class="choices-field">
    <div :class="{
    [color]: true
  }">

      {{ label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EasyField } from "@vef/types";
import { computed } from "vue";

const props = defineProps<{
  value: any;
  field?: EasyField
}>()
const color = computed(() => {

  return props.field?.choices?.find((choice) => choice.key == props.value)?.color || ''
});
const label = computed(() => {
  return props.field?.choices?.find((choice) => choice.key == props.value)?.label || props.value
})
</script>

<style lang="scss">
@use "@/style/customize";
@use "@/style/variables";

.choices-field {
  width: fit-content;

  & > div {

    width: fit-content;
    padding: 0.14rem 0.3rem;
    line-height: 1;
    font-size: 0.5rem;
    border-radius: var(--border-radius);
    color: white;
    font-weight: bold;

    &.primary {
      background-color: var(--color-primary-brighter);
      color: var(--color-primary-darker);
    }

    &.secondary {
      background-color: var(--color-secondary-brighter);
      color: var(--color-secondary-darker);
    }

    &.success {
      background-color: var(--color-success-brighter);
      color: var(--color-success-darker);
    }

    &.error {
      background-color: var(--color-error-brighter);
      color: var(--color-error-darker);
    }

    &.warning {
      background-color: var(--color-warning-brighter);
      color: var(--color-warning-darker);
    }

    &.info {
      background-color: var(--color-info-brighter);
      color: var(--color-info-darker);
    }

    &.accent {
      background-color: var(--color-accent-brighter);
      color: var(--color-accent-darker);
    }

    &.muted {
      background-color: #979797;
      color: #dfdfdf;
    }
  }

}

</style>
