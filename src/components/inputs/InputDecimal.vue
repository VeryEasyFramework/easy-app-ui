<template>
  <InputWrapper
      :label="field.label"
      :error="error"
      :required="field.required"
      :read-only="field.readOnly">
    <input
        :name="field.key"
        ref="input"
        type="number"
        :placeholder="placeholder ||field.readOnly?'': `Enter ${field.label}`"
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
  error?: string;
  placeholder?: string;
  focus?: boolean;
}>();
const emit = defineEmits(["update:modelValue"]);
const input = ref<HTMLInputElement>();
const inputValue = computed({
  get: () => {
    return props.modelValue;
  },
  set: (value) => {
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
