<template>
  <div class="boolean-field" :class="{
    'true': value,
  }">
    <MaterialIcon class="icon" :icon="value?'check':'close'" size="1"/>
  </div>
</template>

<script setup lang="ts">
import {EasyField} from "@/types/easyField.ts";
import MaterialIcon from "@/components/icons/MaterialIcon.vue";

const props = defineProps<{
  value: any;
  field?: EasyField
}>()
</script>

<style>

.boolean-field {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .icon {
    color: white;
    border-radius: 50%;
    padding: 0.2rem;
    width: fit-content;
    font-weight: bold;

    background-color: var(--color-error-bright);


  }

  &.true {
    .icon {

      background-color: var(--color-success-bright);
    }
  }

}

</style>
