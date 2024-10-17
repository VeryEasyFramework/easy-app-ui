<template>
  <InputWrapper
      :label="field.label"
      :error="error"
      :required="field.required"
      :read-only="field.readOnly">
    <textarea
        :name="field.key"
        rows="1"
        @keydown.enter.stop
        :placeholder="placeholder ||field.readOnly?'': `Enter ${field.label}`"
        ref="input"
        v-model="inputValue"
        @input="handleInput"
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
    emit("update:modelValue", value);
  },
});
onMounted(() => {
  if (props.focus) {
    input.value?.focus();
  }

  handleInput();
});

function handleInput() {
  if (!input.value) return;
  input.value.style.height = "auto";
  input.value.style.height = input.value.scrollHeight + "px";
}
</script>

<style lang="scss" scoped></style>
