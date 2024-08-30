<template>
  <div
      class="grid"
      ref="grid"
      :class="{
      'standard-grid': padding,
      'standard-grid-no-padding': !padding,
      ['grid-gap-' + gap]: gap,
      'grid-gap': !gap,
      row: row,
      col: col,
      'mobile-col': mobileCol,
      'mobile-row': !mobileCol,
      fit: fit || justify || align,
      scroll: scroll,
      'auto-col': autoCol,
      'center-content': center,
    }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";

const props = defineProps<{
  padding?: boolean;
  columns?: string[] | number;
  mobileColumns?: string[];
  rows?: string[];
  mobileRows?: string[];
  row?: boolean;
  col?: boolean;
  autoCol?: string | number;
  gap?: string | number;
  fit?: boolean;
  center?: boolean;
  autoWidth?: string;
  mobileCol?: boolean;
  align?: "start" | "end" | "center" | "stretch";
  justify?:
      | "start"
      | "end"
      | "center"
      | "stretch"
      | "space-around"
      | "space-between"
      | "space-evenly";
  scroll?: boolean;
  area?: Array<Array<string>>;
  mobileArea?: Array<Array<string>>;
}>();

const grid = ref<HTMLElement>();
const gridHeight = ref(0);

const gridArea = computed(() => {
  return props.area?.map((row) => `'${row.join(" ")}'`).join(" ");
});

const templateRows = computed(() => {
  return props.rows?.join(" ");
});

const templateColumns = computed(() => {
  if (typeof props.columns === "number") {
    return `repeat(${props.columns}, ${props.fit ? "max-content" : "1fr"})`;
  }
  return props.columns?.join(" ");
});

const mobileArea = computed(() => {
  return props.mobileArea?.map((row) => `'${row.join(" ")}'`).join(" ");
});

const mobileTemplateRows = computed(() => {
  return props.mobileRows?.join(" ");
});

const mobileTemplateColumns = computed(() => {
  return props.mobileColumns?.join(" ");
});

const autoWidth = computed(() => {
  return props.autoWidth || "max-content";
});
</script>

<style lang="scss" scoped>
.standard-grid {
  padding: var(--grid-gap);
  width: calc(100% - var(--grid-gap) * 2);
  height: calc(100% - var(--grid-gap) * 2);
}

.standard-grid-no-padding {
  padding: 0;
  width: 100%;
  height: 100%;
}


.grid {
  grid-template-areas: v-bind(gridArea);
  grid-template-columns: v-bind(templateColumns);
  grid-template-rows: v-bind(templateRows);


  justify-content: v-bind(justify);
  align-items: v-bind(align);

  .center-content {
    place-items: center;
  }

  &.scroll {
    overflow: auto;
  }
}

.auto-col {
  grid-template-columns: repeat(auto-fill, minmax(v-bind(autoCol)));
}

.grid > * {
  overflow: auto;
}

@media (max-width: 768px) {
  .grid {
    grid-template-areas: v-bind(mobileArea);
    grid-template-columns: v-bind(mobileTemplateColumns);
    grid-template-rows: v-bind(mobileTemplateRows);
  }

  .mobile-col {
    grid-auto-flow: column !important;
    grid-auto-columns: minmax(0, 1fr) !important;

    &.fit {
      grid-auto-columns: v-bind(autoWidth) !important;
    }
  }
  .mobile-row {
    grid-auto-flow: row !important;
    grid-auto-rows: minmax(0, 1fr) !important;

    &.fit {
      grid-auto-rows: v-bind(autoWidth) !important;
    }
  }
}

@media (min-width: 768px) {
  .row {
    grid-auto-flow: row;
    grid-auto-rows: minmax(0, 1fr);

    &.fit {
      grid-auto-rows: max-content;
    }
  }
  .col {
    grid-auto-flow: column;
    grid-auto-columns: minmax(0, 1fr);

    &.fit {
      grid-auto-columns: v-bind(autoWidth);
    }
  }
}
</style>
