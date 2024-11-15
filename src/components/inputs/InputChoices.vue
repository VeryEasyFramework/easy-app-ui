<template>
  <InputWrapper
      :label="field.label"
      :error="error"
      :required="field.required"
      class="input-choices"
      :read-only="!edit || field.readOnly">
    <InputDropDown @open="handleOpen" v-model:search-value="searchValue"
                   @clear="clearValue"
                   :edit="edit && !field.readOnly"
                   :label-class="selectedChoice?.color??''"
                   :label="selectedChoice?.label" :empty-label="field.label">


      <template #content="dropDownProps">
        <Container>


          <div @click="handleSelect(choice,dropDownProps.hide)" class="choice py-1"
               :class="{
          [choice.color??'']: true,
          'active': choice.key === selectedChoice?.key,
        }" v-for="(choice,index) in filteredChoices" :key="index">

            {{ choice.label }}
          </div>
        </Container>

      </template>
    </InputDropDown>

  </InputWrapper>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { Choice, EasyField } from "@vef/types/mod.ts";
import InputDropDown from "@/components/widgets/InputDropDown.vue";
import InputWrapper from "@/components/inputs/InputWrapper.vue";
import Container from "@/components/layout/Container.vue";


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
    return props.field.choices?.find((choice: Choice<PropertyKey>) => choice.key === props.modelValue);
  },
  set: (value) => {
    emit("update:modelValue", value?.key);
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

function handleSelect(choice: Choice<PropertyKey>, callback: () => void) {
  selectedChoice.value = choice;
  callback();
  emit("update:modelValue", choice.key);
}

const filteredChoices = computed(() => {
  if (!searchValue.value) {
    return props.field.choices;
  }
  return props.field.choices?.filter((choice: Choice<PropertyKey>) => {

    if (choice.label.toLowerCase().includes(searchValue.value.toLowerCase())) {
      return choice;
    }
  });
});
const emit = defineEmits(["update:modelValue"]);


</script>

<style lang="scss">
.input-choices {
  .choice, .selected-choice .choice {
    font-size: 0.8rem;

  }

  .choice {
    width: fit-content;
    padding: 0.14rem 0.3rem;
    line-height: 1;
    border-radius: var(--border-radius);
    font-weight: bold;
  }

  .choice, .selected-choice {


    &.primary {
      background-color: var(--color-primary-brighter);
      color: var(--color-primary-darker);
    }

    &.secondary {
      background-color: var(--color-secondary-brighter);
      color: var(--color-secondary-darker);
    }

    &.success {
      background-color: var(--color-success-brighter);
      color: var(--color-success-darker);
    }

    &.error {
      background-color: var(--color-error-brighter);
      color: var(--color-error-darker);
    }

    &.warning {
      background-color: var(--color-warning-brighter);
      color: var(--color-warning-darker);
    }

    &.info {
      background-color: var(--color-info-brighter);
      color: var(--color-info-darker);
    }

    &.accent {
      background-color: var(--color-accent-brighter);
      color: var(--color-accent-darker);
    }

    &.muted {
      background-color: #979797;
      color: #dfdfdf;
    }
  }

}
</style>
