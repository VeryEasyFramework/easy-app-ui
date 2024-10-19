<template>
  <InputWrapper
      :label="field?.label"
      :error="error"
      :required="field?.required"
      :description="field?.description"
      :read-only="!edit || field?.readOnly">
    <input
        :name="field?.key ||'email'"
        ref="input"
        type="text"
        v-model="inputValue"
        :disabled="!edit || field?.readOnly"/>
  </InputWrapper>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import InputWrapper from "./InputWrapper.vue";
import { EasyField } from "@vef/types/mod.ts";


const props = defineProps<{
  modelValue?: any;
  error?: string;
  edit?: boolean;
  field?: EasyField;
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
