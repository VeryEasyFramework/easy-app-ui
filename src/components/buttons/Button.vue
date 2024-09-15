<template>
  <button class="button"
          :class="{
            [color??'primary']: color,
          }"
          :type="type||'button'">
    <slot>
      Button
    </slot>
  </button>
</template>
<script setup lang="ts">

const props = defineProps<{
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  color?: "primary" | "secondary" | "success" | "warning" | "error" | "info"
}>()
</script>
