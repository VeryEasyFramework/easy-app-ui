<template>
  <InputWrapper
      :label="field.label"
      :error="error"
      :description="field.description"
      :required="field.required"
      class="overflow-visible input-timestamp"
      :read-only="field.readOnly">
    <div v-if="field.readOnly" class="input" :class="{
        disabled: field.readOnly,
        empty: !inputValue
      }">

      <DisplayTimestamp format="standard" :value="inputValue || 'YYYY/MM/DD'"/>
    </div>
    <DropDown v-else>
      <div class="input" :class="{
        disabled: field.readOnly,
        empty: !inputValue
      }">

        <DisplayTimestamp format="standard" :value="inputValue || 'YYYY/MM/DD'"/>
      </div>
      <template #dropdown="dropdownProps">
        <ContainerPadded class="date-container max-content overflow-visible shadow-small">

          <DatePicker v-model="inputValue" single v-if="!field.readOnly"
                      :key="inputValue"
                      @selectedSingle="(value)=>handleSelected(value,dropdownProps.hide)"/>
        </ContainerPadded>
      </template>
    </DropDown>
  </InputWrapper>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import InputWrapper from "./InputWrapper.vue";
import DatePicker from "@/components/datePicker/DatePicker.vue";
import { EasyField } from "@vef/types/mod.ts";
import ContainerPadded from "@/components/layout/ContainerPadded.vue";
import DisplayTimestamp from "@/components/displayFields/DisplayTimestamp.vue";
import DropDown from "@/components/widgets/DropDown.vue";


const props = defineProps<{
  modelValue?: any;
  field: EasyField;
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

function handleSelected(value: string, callback: () => void) {
  inputValue.value = value;
  callback();
}

onMounted(() => {
  if (props.focus) {
    input.value?.focus();
  }
});
</script>

<style lang="scss">
.input-timestamp {
  .input {
    cursor: pointer;
    line-height: var(--line-height);
    height: var(--line-height);
    font-size: calc(0.87rem);
    border-radius: var(--border-radius);
    border: 1px solid var(--color-border);
    padding: 0 var(--padding-x);
    background-color: var(--color-input-bg);
    align-items: center;
    max-width: 300px;
    box-sizing: border-box;

    &.empty {
      color: var(--color-text-muted);
    }

    &.disabled {

      background-color: var(--color-input-bg-disabled);
      color: var(--color-text-muted);
      cursor: default;
    }
  }
}

.date-container {
  background-color: var(--color-widget-bg);
  border-radius: var(--border-radius);
}
</style>
