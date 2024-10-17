<template>
  <InputWrapper
      :label="field?.label"
      :error="error"
      :required="field?.required"
      :description="field?.description"
      :read-only="!edit || field?.readOnly">
    <input
        maxlength="255"
        :name="field?.key || name"
        ref="input"
        type="text"
        :placeholder="placeholder ||field?.readOnly?'': `Enter ${field?.label || 'text'}`"
        v-model="inputValue"
        :disabled="!edit || field?.readOnly"/>
  </InputWrapper>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { EasyField } from "@vef/types/mod.ts";
import InputWrapper from "@/components/inputs/InputWrapper.vue";

const props = defineProps<{
  modelValue?: any;
  field?: EasyField;
  name?: string;
  edit?: boolean;
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

