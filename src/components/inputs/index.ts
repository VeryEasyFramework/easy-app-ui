import type {EasyFieldType} from "@vef/easy-api";
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
import InputDecimal from "@/components/inputs/InputDecimal.vue";
import InputRichText from "@/components/inputs/InputRichText.vue";
import InputURL from "@/components/inputs/InputURL.vue";

export const fieldMap: Record<EasyFieldType, Component> = {
   BigIntField: InputBigInt,
   BooleanField: InputBoolean,
   ChoicesField: InputChoices,
   ConnectionField: InputConnection,
   DateField: InputDate,
   DecimalField: InputDecimal,
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
   TimeStampField: InputTimestamp,
   RichTextField: InputRichText,
   URLField: InputURL
}
