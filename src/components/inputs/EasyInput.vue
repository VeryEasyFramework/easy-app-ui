<template>

  <component :is="fieldMap[props.field.fieldType]"
             v-model="modelValue"
             :field="props.field"
             :required="field.required"
             :label=" noLabel?'':field.label"
             :readOnly="field.readOnly"
             :error="props.error"
             :name="field.key"
             :placeholder="placeholder"
             :focus="props.focus"
             :description="field.description"
  >
  </component>
</template>

<script setup lang="ts">
import type {EasyField} from "@vef/easy-api";
import {computed} from "vue";
import {fieldMap} from "@/components/inputs/index.ts";


const props = defineProps<{
  modelValue?: any;
  field: EasyField
  error?: string
  focus?: boolean
  placeholder?: string
  noLabel?: boolean
}>()


const emit = defineEmits(["update:modelValue"])
const modelValue = computed({
  get: () => {
    return props.modelValue
  },
  set: (value) => {
    emit("update:modelValue", value)
  }
})
</script>

<style scoped>

</style>
