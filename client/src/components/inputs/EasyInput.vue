<template>

  <InputPassword v-if="field.fieldType==='PasswordField'" v-model="modelValue" :field="field"
                 :label="noLabel?'':field.label"/>

  <InputInt v-else-if="field.fieldType==='IntField'" v-model="modelValue" :field="field"
            :label="noLabel?'':field.label"/>

  <InputBigInt v-else-if="field.fieldType==='BigIntField'" v-model="modelValue"
               :label="noLabel?'':field.label"
               :name="field.key"
               :required="required" :readOnly="readOnly"/>

  <InputDate v-else-if="field.fieldType==='DateField'" v-model="modelValue"
             :label="noLabel?'':field.label"
             :name="field.key"
             :required="required" :readOnly="readOnly"/>

  <InputBoolean v-else-if="field.fieldType==='BooleanField'" v-model="modelValue" :field="field"
                :label="noLabel?'':field.label" :choices="field.choices||[]"/>

  <InputChoices v-else-if="field.fieldType==='ChoicesField'" v-model="modelValue" :field="field"
                :label="noLabel?'':field.label" :choices="field.choices||[]"/>

  <InputMultiChoise v-else-if="field.fieldType==='MultiChoiceField'" v-model="modelValue"
                    :field="field"
                    :label="noLabel?'':field.label" :choices="field.choices||[]"/>

  <InputText v-else-if="field.fieldType==='TextField'" v-model="modelValue"
             :label="noLabel?'':field.label"
             :name="field.key"
             :required="required" :readOnly="readOnly"/>

  <InputEmail v-else-if="field.fieldType==='EmailField'" v-model="modelValue" :field="field"
              :label="noLabel?'':field.label" :choices="field.choices||[]"/>

  <InputImage v-else-if="field.fieldType==='ImageField'" v-model="modelValue" :field="field"
              :label="noLabel?'':field.label" :choices="field.choices||[]"/>

  <InputJSON v-else-if="field.fieldType==='JSONField'" v-model="modelValue" :field="field"
             :label="noLabel?'':field.label" :choices="field.choices||[]"/>

  <InputPhone v-else-if="field.fieldType==='PhoneField'" v-model="modelValue" :field="field"
              :label="noLabel?'':field.label" :choices="field.choices||[]"/>

  <InputConnection v-else-if="field.fieldType==='ConnectionField'" v-model="modelValue"
                   :field="field"
                   :label="noLabel?'':field.label" :choices="field.choices||[]"/>

  <InputData v-else v-model="modelValue" :label="noLabel?'':field.label" :name="field.key"
             :required="required" :readOnly="readOnly"/>
</template>

<script setup lang="ts">
import {EasyField} from "@/types/easyField.ts";
import InputPassword from "@/components/inputs/InputPassword.vue";
import InputData from "@/components/inputs/InputData.vue";
import {computed} from "vue";
import InputInt from "@/components/inputs/InputInt.vue";
import InputChoices from "@/components/inputs/InputChoices.vue";
import InputText from "@/components/inputs/InputText.vue";
import InputDate from "@/components/inputs/InputDate.vue";
import InputBigInt from "@/components/inputs/InputBigInt.vue";
import InputBoolean from "@/components/inputs/InputBoolean.vue";
import InputMultiChoise from "@/components/inputs/InputMultiChoise.vue";
import InputEmail from "@/components/inputs/InputEmail.vue";
import InputImage from "@/components/inputs/InputImage.vue";
import InputJSON from "@/components/inputs/InputJSON.vue";
import InputPhone from "@/components/inputs/InputPhone.vue";
import InputConnection from "@/components/inputs/InputConnection.vue";

const props = defineProps<{
  modelValue?: any;
  field: EasyField
  noLabel?: boolean
}>()

const required = computed(() => {
  if ("required" in props.field) {
    return props.field.required
  }
})
const readOnly = computed(() => {
  if ("readOnly" in props.field) {
    return props.field.readOnly
  }
})

const emit = defineEmits(["update:modelValue"])
const modelValue = computed({
  get: () => {
    return props.modelValue
  },
  set: (value) => {
    emit("update:modelValue", value)
  }
})
</script>

<style scoped>

</style>
