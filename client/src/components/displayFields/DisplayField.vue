<template>
  <div>
    {{ field.fieldType }}
    {{ fetchValue }}
    <DisplayData v-if="field.fieldType==='DataField'" :value="value" :field="field"/>

    <DisplayInt v-else-if="field.fieldType==='IntField'" :value="value" :field="field"/>
    <DisplayBigInt v-else-if="field.fieldType==='BigIntField'" :value="value" :field="field"/>
    <DisplayDate v-else-if="field.fieldType==='DateField'" :value="value" :field="field"/>
    <DisplayBoolean v-else-if="field.fieldType==='BooleanField'" :value="value" :field="field"/>

    <DisplayPassword v-else-if="field.fieldType='PasswordField'" :value="value" :field="field"/>
    <DisplayChoices v-else-if="field.fieldType='ChoicesField'" :value="value" :field="field"/>
    <DisplayMultiChoice v-else-if="field.fieldType='MultiChoiceField'" :value="value"
                        :field="field"/>
    <DisplayText v-else-if="field.fieldType='TextField'" :value="value" :field="field"/>
    <DisplayEmail v-else-if="field.fieldType='EmailField'" :value="value" :field="field"/>
    <DisplayImage v-else-if="field.fieldType='ImageField'" :value="value" :field="field"/>
    <DisplayJSON v-else-if="field.fieldType='JSONField'" :value="value" :field="field"/>
    <DisplayPhone v-else-if="field.fieldType='PhoneField'" :value="value" :field="field"/>
    <DisplayConnection v-else-if="field.fieldType='ConnectionField'" :value="value" :field="field"
                       :titleValue="fetchValue"/>

    <DisplayData v-else :value="value" :field="field"/>
  </div>
</template>

<script setup lang="ts">
import type {EasyField} from "@/types/easyField.ts";
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

const props = defineProps<{
  value: any;
  field: EasyField;
  fetchField?: EasyField
  fetchValue?: any
}>()
</script>

<style scoped>

</style>
