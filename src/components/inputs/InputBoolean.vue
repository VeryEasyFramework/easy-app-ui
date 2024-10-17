<template>
  <Container class="row shrink boolean-input input">
    <label v-if="!noLabel" class="text-small label">

    </label>
    <Container
        class=" col shrink px-2 input horizontal-align-between vertical-align-center align-content-center">


      <label class="text-small label">
        <span>{{ field.label }}</span>
        <span v-if="field.required" class="ps-1 text-error">*</span>
      </label>

      <Switch color="primary" :on="modelValue??false" @toggle="handleToggle"/>
    </Container>
    <div v-if="!noLabel" style="display: contents;">

      <div v-if="error" class="error-message bold italic">{{ error }}</div>
      <div v-else-if="field.description" class="description italic bold">{{
          field.description
        }}
      </div>
    </div>
  </Container>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Switch from "@/components/buttons/Switch.vue";
import { EasyField } from "@vef/types/mod.ts";
import Container from "@/components/layout/Container.vue";


const props = defineProps<{
  modelValue?: boolean;
  field: EasyField;
  noLabel?: boolean;
  error?: string;
  focus?: boolean;
}>();
const emit = defineEmits(["update:modelValue"]);
const input = ref<HTMLInputElement>();

function handleToggle(value: boolean) {
  emit("update:modelValue", value);
}

onMounted(() => {
  if (props.focus) {
    input.value?.focus();
  }
});
</script>

<style lang="scss">
.boolean-input {
  .label {
    height: 0.7rem;
  }

  .input {
    border-radius: var(--border-radius);
    border: 1px solid var(--color-border);
    height: var(--line-height);
    width: var(--input-width);
    background-color: var(--color-input-bg);
  }
}

</style>
