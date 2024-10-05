<template>
  <div class="switch" :class="{
    on: on
  }" @click="on=!on">
    <input type="checkbox" :checked="on">
    <span class="slider"></span>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";

const props = defineProps<{
  on: boolean;
}>()

const emit = defineEmits<{
  toggle: [value: boolean]
}>()

const on = computed({
  get: () => props.on,
  set: (value: boolean) => {
    emit('toggle', value)
    return value
  }
})
</script>

<style lang="scss">

.switch {
  --switch-height: 0.8rem;
  --switch-padding: 0.15rem;
  display: inline-block;
  position: relative;
  width: calc(var(--switch-height) * 2.5);
  height: calc(var(--switch-height) + var(--switch-padding) * 2);

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    border-radius: var(--switch-height);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-body-bg-dark);
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: var(--switch-height);
    border-radius: var(--switch-height);
    width: calc(var(--switch-height) * 1.2);
    left: var(--switch-padding);
    bottom: var(--switch-padding);
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  &.on {

    .slider {
      --transform: calc(var(--switch-height) * 1.2 - var(--switch-padding));
      background-color: var(--color-text);

      &:before {
        background-color: var(--color-bg);

        transform: translateX(var(--transform));
      }
    }


  }
}


</style>
