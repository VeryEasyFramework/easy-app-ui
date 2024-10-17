<template>
  <InputWrapper
      :label="label"
      :error="error"
      :required="required"
      :read-only="readOnly">
    <Container class="position-relative">

    <textarea
        :name="name"
        class="json-textarea"
        ref="input"
        v-model="inputValueRef"
        @input="handleInput"
        :disabled="readOnly"/>
      <DisplayJSON class="z-1 display-json" :value="jsonValue"/>
    </Container>
  </InputWrapper>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import InputWrapper from "./InputWrapper.vue";
import DisplayJSON from "@/components/displayFields/DisplayJSON.vue";
import Container from "@/components/layout/Container.vue";


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

const jsonValue = ref(props.modelValue);

const inputValueRef = ref<string>('');

function handleInput() {
  try {
    jsonValue.value = JSON.parse(inputValueRef.value);
    inputValueRef.value = JSON.stringify(jsonValue.value, null, 2);
    emit("update:modelValue", jsonValue.value);
  } catch (e) {
    jsonValue.value = inputValueRef.value;
    console.error(e);
  }
}

onMounted(() => {
  if (props.focus) {
    input.value?.focus();
  }
  inputValueRef.value = JSON.stringify(props.modelValue, null, 2);

});
</script>

<style lang="scss">
.json-textarea {
}

.display-json {
  pointer-events: none;
}
</style>
