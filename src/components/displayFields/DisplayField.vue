<template>
  <DisplayFieldWrapper :field="field">

    <component :is="displayFieldsMap[props.field.fieldType]" v-bind="props"/>
  </DisplayFieldWrapper>
</template>

<script setup lang="ts">
import type {EasyField, EasyFieldType} from "@vef/easy-api";

import DisplayFieldWrapper from "@/components/displayFields/DisplayFieldWrapper.vue";
import {displayFieldsMap} from "@/components/displayFields/index.ts";


const props = defineProps<{
  value: any;
  field: EasyField;
  direction?: 'horizontal' | 'vertical';
  titleValue?: string;
  format?: string;
  routePrefix?: string;

}>()
</script>

<style lang="scss">

.display-field {

  font-size: var(--text-body-size);
}

</style>
