import type {EasyFieldType} from "@/types/easyField.ts";
import type {Component} from "vue";
import DisplayData from "@/components/displayFields/DisplayData.vue";
import DisplayInt from "@/components/displayFields/DisplayInt.vue";
import DisplayBigInt from "@/components/displayFields/DisplayBigInt.vue";
import DisplayDate from "@/components/displayFields/DisplayDate.vue";
import DisplayBoolean from "@/components/displayFields/DisplayBoolean.vue";
import DisplayPassword from "@/components/displayFields/DisplayPassword.vue";
import DisplayChoices from "@/components/displayFields/DisplayChoices.vue";
import DisplayMultiChoice from "@/components/displayFields/DisplayMultiChoice.vue";
import DisplayText from "@/components/displayFields/DisplayText.vue";
import DisplayEmail from "@/components/displayFields/DisplayEmail.vue";
import DisplayImage from "@/components/displayFields/DisplayImage.vue";
import DisplayJSON from "@/components/displayFields/DisplayJSON.vue";
import DisplayPhone from "@/components/displayFields/DisplayPhone.vue";
import DisplayConnection from "@/components/displayFields/DisplayConnection.vue";
import DisplayTimestamp from "@/components/displayFields/DisplayTimestamp.vue";
import DisplayDecimal from "@/components/displayFields/DisplayDecimal.vue";

export const displayFieldsMap: Record<EasyFieldType, Component> = {
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
   TimeStampField: DisplayTimestamp,
   DecimalField: DisplayDecimal
}
