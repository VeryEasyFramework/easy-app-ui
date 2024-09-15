<template>
  <InputWrapper
      :label="label"
      :error="error"
      :required="required"
      :read-only="readOnly">
    <input
        :name="name"
        ref="input"
        type="date"
        v-model="inputValue"
        :disabled="readOnly"/>
  </InputWrapper>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import InputWrapper from "./InputWrapper.vue";


const props = defineProps<{
  modelValue?: any;
  label?: string;
  error?: string;
  name?: string;
  required?: boolean;
  readOnly?: boolean;
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
