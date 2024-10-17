<template>
  <InputWrapper
      :label="field.label"
      :error="error"
      :required="field.required"
      :read-only="field.readOnly">
    <input
        :name="field.key"
        ref="input"
        :placeholder="placeholder ||field.readOnly?'': `Enter ${field.label}`"
        type="number"
        v-model="inputValue"
        :disabled="field.readOnly"/>
  </InputWrapper>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import InputWrapper from "./InputWrapper.vue";
import { EasyField } from "@vef/types/mod.ts";


const props = defineProps<{
  modelValue?: any;
  field: EasyField;
  placeholder?: string;
  error?: string;
  focus?: boolean;
}>();
const emit = defineEmits(["update:modelValue"]);
const input = ref<HTMLInputElement>();
const inputValue = computed({
  get: () => {
    return props.modelValue;
  },
  set: (value) => {
    // check if value is a number and if not, set it to null
    if (isNaN(value)) {
      value = null;
    }
    // check if value has a decimal point and if so, round it to 0 decimal places
    if (value && value.toString().includes(".")) {
      value = Math.round(value);
    }
    emit("update:modelValue", value);
  },
});
onMounted(() => {
  if (props.focus) {
    input.value?.focus();
  }
});
</script>

<style lang="scss" scoped></style>
