<template>
  <div
      class="icon-font"
      @touchstart.prevent
      :style="{
      fontSize: `${size || 1}rem`,
      '--color-icon': `var(--color-${color || 'icon'})`,
    }">
    {{ icon }}
  </div>
</template>

<script setup lang="ts">


import {MaterialIcons} from "./materialIcons";
import {ExtendedColor} from "../../types/colors";

defineProps<{
  icon: MaterialIcons;
  size?: number | string;
  color?: ExtendedColor;
}>();
</script>

<style scoped>
.icon-font {
  font-family: "Material Symbols Outlined", "Material Icons Outlined",
  "Material Icons", sans-serif;
  color: var(--color-icon);
  line-height: 1;
}
</style>
