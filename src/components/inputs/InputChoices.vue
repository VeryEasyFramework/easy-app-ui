<template>
  <InputWrapper
      :label="field.label"
      :error="error"
      :required="field.required"
      class="input-choices"
      :read-only="!edit || field.readOnly">
    <InputDropDown @open="handleOpen" v-model:search-value="searchValue"
                   @clear="clearValue"
                   :label="selectedChoice?.label" :empty-label="field.label">


      <template #content="dropDownProps">


        <div @click="handleSelect(choice,dropDownProps.hide)" class="choice py-1"
             :class="{
          [choice.color??'']: true,
          'active': choice.key === selectedChoice?.key,
        }" v-for="(choice,index) in filteredChoices" :key="index">

          {{ choice.label }}
        </div>

      </template>
    </InputDropDown>

  </InputWrapper>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { Choice, EasyField } from "@vef/types/mod.ts";
import InputDropDown from "@/components/widgets/InputDropDown.vue";
import InputWrapper from "@/components/inputs/InputWrapper.vue";


const props = defineProps<{
  modelValue?: any;
  field: EasyField;
  edit?: boolean;
  error?: string;
  focus?: boolean;
}>();

const open = ref(false);
const selectedChoice = computed({
  get: () => {
    return props.field.choices?.find((choice: Choice) => choice.key === props.modelValue);
  },
  set: (value) => {
    emit("update:modelValue", value.key);
  }
})
const searchValue = ref("");


function clearValue(close: () => void) {
  selectedChoice.value = {
    key: '',
    label: ''
  }
  close();
}

function handleOpen(value: boolean) {
  open.value = value;

}

function handleSelect(choice: Choice, callback: () => void) {
  selectedChoice.value = choice;
  callback();
  emit("update:modelValue", choice.key);
}

const filteredChoices = computed(() => {
  if (!searchValue.value) {
    return props.field.choices;
  }
  return props.field.choices?.filter((choice: Choice) => {

    if (choice.label.toLowerCase().includes(searchValue.value.toLowerCase())) {
      return choice;
    }
  });
});
const emit = defineEmits(["update:modelValue"]);


</script>

<style lang="scss">
.input-choices {


}
</style>
