<template>

  <component :is="fieldMap[props.field.fieldType]"
             v-model="modelValue"
             :field="props.field"
             :error="props.error"
             :edit="props.editable"
             :placeholder="placeholder"
             :icon="icon"
             :focus="props.focus"
             :noLabel="props.noLabel"
             @selected="$emit('selected',$event)"
             v-model:titleValue="titleValue"

  >
  </component>
</template>

<script setup lang="ts">

import { computed } from "vue";
import { fieldMap } from "@/components/inputs/index.ts";
import { EasyField } from "@vef/types";
import { MaterialIcons } from "@/components/icons/materialIcons.ts";


const props = defineProps<{
  modelValue?: any
  titleValue?: string | number
  field: EasyField
  icon?: MaterialIcons
  editable?: boolean
  error?: string
  focus?: boolean
  placeholder?: string
  noLabel?: boolean
}>()

const emit = defineEmits<{
  (event: 'selected', value: any): void
  (event: 'update:modelValue', value: any): void
  (event: 'update:titleValue', value: string | number | undefined): void
}>()

const modelValue = computed({
  get: () => {
    return props.modelValue
  },
  set: (value) => {
    emit("update:modelValue", value)
  }
})
const titleValue = computed<string | number | undefined>({
  get: () => {
    return props.titleValue
  },
  set: (value) => {
    emit("update:titleValue", value)
  }
})
</script>

<style scoped>

</style>
