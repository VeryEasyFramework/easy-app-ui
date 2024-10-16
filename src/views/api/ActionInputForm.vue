<template>
  <BasicForm :columns="action.params.length > 3? 2:1" :name="action.actionName"
             @cancel="$emit('cancel')" @submitted="handleSubmit">
    <component :is="fieldMap[param.type]" v-for="(param,index) in action.params"
               :key="param.paramName"
               v-model="data[param.paramName].value"
               :error="data[param.paramName].error"
               :focus="index === 0"
               :required="param.required"
               :label="formatString(param.paramName,'titleCase','camelCase')"/>

  </BasicForm>
</template>

<script setup lang="ts">
import {DocsAction} from "@vef/types";
import {fieldMap} from "@/components/inputs/index.ts";
import {formatString} from "@/utils/index.ts";
import BasicForm from "@/components/form/BasicForm.vue";
import {onBeforeMount, ref} from "vue";

const props = defineProps<{
  action: DocsAction
}>()

const data = ref<Record<string, {
  value: any,
  error?: string
}>>({})
const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'submitted', values: Record<string, any>): void
}>()

function handleSubmit() {
  if (!validateRequired()) return

  const values: Record<string, any> = {}
  for (const key in data.value) {
    if (data.value[key].value) {

      values[key] = data.value[key].value
    }
  }
  emit("submitted", values)

}

function validateRequired() {
  if (!props.action.params) return
  let valid = true
  for (const param of props.action.params) {
    if (param.required && !data.value[param.paramName].value) {
      data.value[param.paramName].error = "This field is required"
      valid = false
      continue
    }
    data.value[param.paramName].error = undefined
  }
  return valid
}

onBeforeMount(() => {
  if (!props.action.params) return

  for (const param of props.action.params) {
    data.value[param.paramName] = {
      value: null,
      error: undefined
    }
  }
})
</script>

<style scoped>

</style>
