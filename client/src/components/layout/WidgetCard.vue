<template>
  <div
      class="card shadow grid grid-gap widget-card"
      :class="{
      'full-height': fullHeight || full,
      'full-width': fullWidth || full,
      title: title,
      flat: flat,
      'no-bg': noBg,
      'no-padding': noPadding,
    }">
    <TextTitle v-if="title">{{ title }}</TextTitle>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {ExtendedColor} from "../../types/colors";
import TextTitle from "../text/TextTitle.vue";


const props = defineProps<{
  fullHeight?: boolean;
  fullWidth?: boolean;
  title?: string;
  noPadding?: boolean;
  full?: boolean;
  flat?: boolean;
  noBg?: boolean;
  bgColor?: ExtendedColor;
  scroll?: boolean;
}>();

const bgColor = computed(() => {
  if (props.bgColor) {
    return `var(--color-${props.bgColor})`;
  }
  return "var(--color-widget-bg)";
});

const scrollValue = computed(() => {
  if (props.scroll) {
    return "scroll";
  }
  return "auto";
});
</script>

<style lang="scss" scoped>
.widget-card {
  width: max-content;
  overflow: auto;
  backdrop-filter: blur(5px);
  background-color: v-bind(bgColor);
  box-sizing: border-box;

  grid-template-rows: 1fr;
  grid-template-columns: 1fr;

  &.full-height {
    height: 100%;
  }

  &.full-width {
    width: 100%;
  }

  &.title {
    grid-template-rows: max-content 1fr;
  }

  &.flat {
    box-shadow: none;
  }

  &.no-bg {
    background-color: transparent !important;
    box-shadow: none !important;
    backdrop-filter: none !important;
  }

  &.no-padding {
    padding: 0;
  }

  .content {
  }
}
</style>
