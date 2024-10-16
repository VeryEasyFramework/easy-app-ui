<template>

  <component :is="fieldMap[props.field.fieldType]"
             v-model="modelValue"
             :field="props.field"
             :error="props.error"
             :editable="props.editable"
             :placeholder="placeholder "
             :focus="props.focus"
             :noLabel="props.noLabel"
             @selected="$emit('selected',$event)"
             v-model:titleValue="titleValue"

  >
  </component>
</template>

<script setup lang="ts">

import {computed, onMounted} from "vue";
import {fieldMap} from "@/components/inputs/index.ts";
import {EasyField} from "@vef/types";


const props = defineProps<{
  modelValue?: any
  titleValue?: string | number
  field: EasyField
  editable?: boolean
  error?: string
  focus?: boolean
  placeholder?: string
  noLabel?: boolean
}>()

const emit = defineEmits<{
  (event: 'selected', value: any): void
  (event: 'update:modelValue', value: any): void
  (event: 'update:titleValue', value: string | number): void
}>()

const modelValue = computed({
  get: () => {
    return props.modelValue
  },
  set: (value) => {
    emit("update:modelValue", value)
  }
})
const titleValue = computed({
  get: () => {
    return props.titleValue
  },
  set: (value) => {
    emit("update:titleValue", value)
  }
})
onMounted(() => {
  console.log(props.modelValue)
  console.log(props.field.key)
})
</script>

<style scoped>

</style>
