<template>
  <InputWrapper
      :label="label"
      :error="error"
      :required="required"
      :read-only="readOnly">
    <select
        :name="name"
        ref="input"
        v-model="inputValue"
        :disabled="readOnly">
      <option v-for="choice in choices" :key="choice.key" :value="choice.key">
        {{ choice.label }}
      </option>
    </select>

  </InputWrapper>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import InputWrapper from "./InputWrapper.vue";
import {Choice} from "@/types/easyField.ts";


const props = defineProps<{
  modelValue?: any;
  label?: string;
  error?: string;
  name?: string;
  required?: boolean;
  readOnly?: boolean;
  focus?: boolean;
  choices: Choice[];
}>();
const emit = defineEmits(["update:modelValue"]);
const input = ref<HTMLSelectElement>();
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
