<template>
  <DisplayFieldWrapper :field="field" class="display-field" :direction="direction">
    <component :is="componentMap[props.field.fieldType]" v-bind="props"/>
  </DisplayFieldWrapper>
</template>

<script setup lang="ts">
import type {EasyField, EasyFieldType} from "@/types/easyField.ts";
import DisplayData from "@/components/displayFields/DisplayData.vue";
import DisplayInt from "@/components/displayFields/DisplayInt.vue";
import DisplayPassword from "@/components/displayFields/DisplayPassword.vue";
import DisplayBigInt from "@/components/displayFields/DisplayBigInt.vue";
import DisplayDate from "@/components/displayFields/DisplayDate.vue";
import DisplayBoolean from "@/components/displayFields/DisplayBoolean.vue";
import DisplayChoices from "@/components/displayFields/DisplayChoices.vue";
import DisplayMultiChoice from "@/components/displayFields/DisplayMultiChoice.vue";
import DisplayText from "@/components/displayFields/DisplayText.vue";
import DisplayEmail from "@/components/displayFields/DisplayEmail.vue";
import DisplayImage from "@/components/displayFields/DisplayImage.vue";
import DisplayJSON from "@/components/displayFields/DisplayJSON.vue";
import DisplayPhone from "@/components/displayFields/DisplayPhone.vue";
import DisplayConnection from "@/components/displayFields/DisplayConnection.vue";
import {type Component} from "vue";
import InputTimestamp from "@/components/inputs/InputTimestamp.vue";
import DisplayFieldWrapper from "@/components/displayFields/DisplayFieldWrapper.vue";

const componentMap: Record<EasyFieldType, Component> = {
  IDField: DisplayData,
  DataField: DisplayData,
  IntField: DisplayInt,
  BigIntField: DisplayBigInt,
  DateField: DisplayDate,
  BooleanField: DisplayBoolean,
  PasswordField: DisplayPassword,
  ChoicesField: DisplayChoices,
  MultiChoiceField: DisplayMultiChoice,
  TextField: DisplayText,
  EmailField: DisplayEmail,
  ImageField: DisplayImage,
  JSONField: DisplayJSON,
  PhoneField: DisplayPhone,
  ConnectionField: DisplayConnection,
  TimestampField: InputTimestamp
}

const props = defineProps<{
  value: any;
  field: EasyField;
  direction?: 'horizontal' | 'vertical';
  fetchField?: EasyField
  fetchValue?: any
}>()
</script>

<style lang="scss">

.display-field {

  font-size: var(--text-body-size);
}

</style>
