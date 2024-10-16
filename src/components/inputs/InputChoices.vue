<template>
  <InputWrapper
      :label="label"
      :error="error"
      :required="required"
      :read-only="readOnly">
    <ButtonDropdown class="choices-input" :key="open.toString()">

      <!--      <InputText :value="inputValue" :field="field"/>-->
      <div class="choice" :class="{
        [selectedChoice?.color||'muted']: true
      }">
        {{ selectedChoice?.label || 'Click to Select...' }}
      </div>
      <template #dropdown>

        <div class="p-2 choices-dropdown ">
          <div v-if="!field.required" class="choice label" @click="handleChoice({
          key: '',
          label:'',
          })">
            clear
          </div>
          <div class="choice" :class="{
            [choice.color||'muted']: true
          }" v-for="choice in choices"
               @click.stop.prevent="handleChoice(choice)"
               :key="choice.key"
          >
            {{ choice.label }}
          </div>
        </div>
      </template>
    </ButtonDropdown>

  </InputWrapper>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import InputWrapper from "./InputWrapper.vue";
import type {EasyField} from "@vef/types";
import ButtonDropdown from "@/components/buttons/ButtonDropdown.vue";

const open = ref(false);

const props = defineProps<{
  modelValue?: any;
  label?: string;
  error?: string;
  name?: string;
  required?: boolean;
  readOnly?: boolean;
  focus?: boolean;
  field: EasyField;
  choices?: EasyField['choices'];
}>();
const emit = defineEmits(["update:modelValue"]);
const choices = props.choices || props.field.choices || [];
const selectedChoice = computed({
  get: () => {
    return choices.find((c) => c.key === props.modelValue);
  },
  set: (choice: any) => {
    emit("update:modelValue", choice.key);

  },
})

function handleChoice(choice: any) {
  selectedChoice.value = choice;
  open.value = !open.value;
}

onMounted(() => {
});
</script>

<style lang="scss">
.choices-input {
  .choices-dropdown {

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
    background-color: var(--color-widget-bg);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-small);


  }

  .choice {

    width: fit-content;
    padding: 0.14rem 0.3rem;
    line-height: 1;
    font-size: 0.5rem;
    border-radius: var(--border-radius);
    color: white;
    font-weight: bold;

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

    &:hover {
      cursor: pointer;

      &.primary {
        background-color: var(--color-primary);
      }

      &.secondary {
        background-color: var(--color-secondary);
      }

      &.success {
        background-color: var(--color-success);
      }

      &.error {
        background-color: var(--color-error);
      }

      &.warning {
        background-color: var(--color-warning);
      }

      &.info {
        background-color: var(--color-info);
      }

      &.accent {
        background-color: var(--color-accent);
      }

      &.muted {
        background-color: #979797;
        color: #dfdfdf;
      }
    }
  }
}
</style>
