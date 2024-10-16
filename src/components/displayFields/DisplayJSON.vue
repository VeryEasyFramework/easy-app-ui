<template>
  <Container class="json-wrapper">
    <div class="gutter"></div>
    <Container class="json-content-wrapper position-relative">

      <div class="json-content" v-html="content"/>


    </Container>
  </Container>
</template>

<script setup lang="ts">
import type {EasyField} from "@vef/types";
import {computed, onMounted, ref} from "vue";
import {formatJson} from "@/components/displayFields/jsonFormat.ts";
import Container from "@/components/layout/Container.vue";

const props = defineProps<{
  value: any;
  field?: EasyField
}>()

const content = computed(() => {
  if (!props.value) return `<div class="italic">no content</div>`
  const stringContent = JSON.stringify(props.value, null, 2)
  const rows = stringContent.split("\n")
  return rows.map(row => {
    return `${formatJson(row)}`
  }).join("")
})


</script>

<style lang="scss">
.json-wrapper {
  --gutter-width: 2.5rem;
  grid-template-columns:var(--gutter-width) 1fr;
  grid-template-rows: 1fr;
  background-color: #121212;
  gap: 0;
  border-radius: var(--border-radius);

  .gutter {
    background-color: #1E1E1E;
    z-index: 0;
  }

  .json-content-wrapper {
    height: max-content;
    overflow: visible;
  }

  .json-content {

    --json-padding: 0.5rem;
    font-family: 'Ubuntu Mono', monospace;
    white-space: pre-wrap;
    padding: 1rem var(--json-padding);
    height: max-content;
    font-size: 0.9rem;
    line-height: 1.1rem;
    color: white;
    z-index: 2;


    & > * ::selection {
      background-color: var(--color-primary);
      color: white;
    }

    .json-key {
      color: #94DBFD;
    }

    .json-string {
      color: #FFAD77;
    }

    .json-boolean {
      color: #569CD5;
    }

    .json-number {
      color: #B5CEA8;
    }

    .json-null {
      color: #569CD5;
    }

    .json-colon {
      color: #D4D4D4;
    }

    // add line numbers

    .json-row {
      counter-increment: line;
      position: relative;


      &::before {
        overflow: visible;
        --gutter-color: #979797;
        position: absolute;
        left: 0;
        width: var(--gutter-width);
        content: counter(line) " ";
        font-size: 0.8rem;
        color: var(--gutter-color);
        text-align: right;
        transform: translateX(calc(-100% - 0.5rem));
        box-sizing: border-box;

      }
    }


  }
}
</style>
