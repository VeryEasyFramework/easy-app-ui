import {EasyFieldType} from "@/types/easyField.ts";
import type {Component} from "vue";
import InputBigInt from "@/components/inputs/InputBigInt.vue";
import InputBoolean from "@/components/inputs/InputBoolean.vue";
import InputChoices from "@/components/inputs/InputChoices.vue";
import InputConnection from "@/components/inputs/InputConnection.vue";
import InputDate from "@/components/inputs/InputDate.vue";
import InputEmail from "@/components/inputs/InputEmail.vue";
import InputImage from "@/components/inputs/InputImage.vue";
import InputInt from "@/components/inputs/InputInt.vue";
import InputJSON from "@/components/inputs/InputJSON.vue";
import InputMultiChoice from "@/components/inputs/InputMultiChoice.vue";
import InputPassword from "@/components/inputs/InputPassword.vue";
import InputPhone from "@/components/inputs/InputPhone.vue";
import InputText from "@/components/inputs/InputText.vue";
import InputData from "@/components/inputs/InputData.vue";
import InputTimestamp from "@/components/inputs/InputTimestamp.vue";

export const inputFieldMap: Record<EasyFieldType, Component> = {
   BigIntField: InputBigInt,
   BooleanField: InputBoolean,
   ChoicesField: InputChoices,
   ConnectionField: InputConnection,
   DateField: InputDate,
   EmailField: InputEmail,
   ImageField: InputImage,
   IntField: InputInt,
   JSONField: InputJSON,
   MultiChoiceField: InputMultiChoice,
   PasswordField: InputPassword,
   PhoneField: InputPhone,
   TextField: InputText,
   DataField: InputData,
   IDField: InputData,
   TimestampField: InputTimestamp,
}
