<template>
  <InputWrapper
      :label="field.label"
      :error="error"
      :required="field.required"
      :read-only="!edit || field.readOnly">
    <Container class="position-relative">
      <DisplayJSON v-if="!edit || field.readOnly" class="z-1 display-json" :value="jsonValue"/>
      <textarea
          v-else
          :name="field.key"
          class="json-textarea"
          ref="input"
          v-model="inputValueRef"
          @input="handleInput"
      />
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
  field?: any;
  error?: string;
  edit?: boolean;
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
  if (props.modelValue) {

    inputValueRef.value = JSON.stringify(props.modelValue, null, 2);
  }

});
</script>

<style lang="scss">
.json-textarea {
}

.display-json {
  pointer-events: none;
}
</style>
