<template>

  <component :is="inputFieldMap[props.field.fieldType]"
             v-model="modelValue"
             :field="props.field"
             :required="field.required"
             :label="field.label"
             :readOnly="field.readOnly"
             :error="props.error"
             :name="field.key"
             :placeholder="placeholder"
             :focus="props.focus"
             :description="field.description"
             :noLabel="props.noLabel"
  >
  </component>
</template>

<script setup lang="ts">
import {EasyField, EasyFieldType} from "@/types/easyField.ts";
import InputPassword from "@/components/inputs/InputPassword.vue";
import InputData from "@/components/inputs/InputData.vue";
import {type Component, computed} from "vue";
import InputInt from "@/components/inputs/InputInt.vue";
import InputChoices from "@/components/inputs/InputChoices.vue";
import InputText from "@/components/inputs/InputText.vue";
import InputDate from "@/components/inputs/InputDate.vue";
import InputBigInt from "@/components/inputs/InputBigInt.vue";
import InputBoolean from "@/components/inputs/InputBoolean.vue";
import InputMultiChoice from "@/components/inputs/InputMultiChoice.vue";
import InputEmail from "@/components/inputs/InputEmail.vue";
import InputImage from "@/components/inputs/InputImage.vue";
import InputJSON from "@/components/inputs/InputJSON.vue";
import InputPhone from "@/components/inputs/InputPhone.vue";
import InputConnection from "@/components/inputs/InputConnection.vue";
import InputTimestamp from "@/components/inputs/InputTimestamp.vue";
import {inputFieldMap} from "@/components/inputs/index.ts";


const props = defineProps<{
  modelValue?: any;
  field: EasyField
  error?: string
  focus?: boolean
  placeholder?: string
  noLabel?: boolean
}>()

const required = computed(() => {
  if ("required" in props.field) {
    return props.field.required
  }
})
const readOnly = computed(() => {
  if ("readOnly" in props.field) {
    return props.field.readOnly
  }
})

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
