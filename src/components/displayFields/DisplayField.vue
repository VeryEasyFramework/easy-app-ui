<template>
  <DisplayFieldWrapper :field="field" class="display-field" :direction="direction">
    <component :is="displayFieldsMap[props.field.fieldType]" v-bind="props"/>
  </DisplayFieldWrapper>
</template>

<script setup lang="ts">
import type {EasyField, EasyFieldType} from "@/types/easyField.ts";

import DisplayFieldWrapper from "@/components/displayFields/DisplayFieldWrapper.vue";
import {displayFieldsMap} from "@/components/displayFields/index.ts";


const props = defineProps<{
  value: any;
  field: EasyField;
  direction?: 'horizontal' | 'vertical';
  fetchField?: EasyField
  fetchValue?: any
}>()
</script>

<style lang="scss">

.display-field {

  font-size: var(--text-body-size);
}

</style>
