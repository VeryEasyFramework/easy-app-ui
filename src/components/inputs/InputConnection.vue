<template>
  <div class="connection-input position-relative">

    <InputWrapper

        :label="field.label"
        :error="error"
        :required="field.required"
        :description="field.description"
        :read-only="field.readOnly">
      <input v-if="!edit || field.readOnly" :value="titleValue" disabled>
      <InputDropDown v-else @open="handleOpen" v-model:search-value="searchValue"
                     @update:searchValue="handleInput"
                     @clear="clearValue"
                     :icon="field.connectionEntryType==='user'?'person':undefined"
                     :label="titleValue" :empty-label="connectionEntryType?.config.label">


        <template #content="dropDownProps">


          <div class="choice py-1" v-for="item in data" :key="item.id"
               @click="selectItem(item,dropDownProps.hide)">
            {{ item[titleFieldKey] || item.id }}
          </div>


        </template>
      </InputDropDown>
    </InputWrapper>

  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref } from "vue";
import InputWrapper from "./InputWrapper.vue";

import { easyApi } from "@/api/index.ts";
import type { EasyField, Entry, EntryType } from "@vef/types/mod.ts";
import { entryTypeStore } from "@/stores/entryTypeStore.ts";
import { MaterialIcons } from "@/components/icons/materialIcons.ts";
import InputDropDown from "@/components/widgets/InputDropDown.vue";


const props = defineProps<{
  modelValue?: any;
  titleValue?: string | number;
  edit?: boolean;
  icon?: MaterialIcons;
  field: EasyField;
  error?: string;
  focus?: boolean;
}>();

function clearValue(close: () => void) {
  modelValue.value = null
  titleValue.value = ''

  close()
}

const modelValue = computed({
  get: () => {
    return props.modelValue
  },
  set: (value) => {

    emit("update:modelValue", value)
    if (value) {
      emit("selected", value)
    }
  }
})
const titleValue = computed({
  get: () => {
    return props.titleValue
  },
  set: (value) => {
    emit("update:titleValue", value)
  }
})

function handleOpen(value: boolean) {
  open.value = value;
  if (value) {
    input.value?.focus();
    handleInput()
  }
  // if (value) {
  //   handleInput({target: input.value})
  // }
}

const emit = defineEmits(["update:modelValue", "update:titleValue", "selected"]);
const input = ref<HTMLInputElement>();


let connectionEntryType: EntryType | undefined
let titleFieldKey: string = 'id'
let titleField: EasyField | undefined
onBeforeMount(() => {
  if (!props.field.connectionEntryType) {
    throw new Error('Connection field must have connectionEntryType')
  }
  const entryType = entryTypeStore.get(props.field.connectionEntryType)
  if (!entryType) {
    throw new Error(`Entry ${props.field.connectionEntryType} not found`)
  }

  connectionEntryType = entryType
  titleFieldKey = connectionEntryType.config.titleField || 'id'
  titleField = connectionEntryType.fields.find(f => f.key === titleFieldKey)

})
onMounted(() => {


  if (props.focus) {
    input.value?.focus();
  }

});

const searchValue = ref('')
const open = ref(false)


function selectItem(item: Entry, callback: () => void) {

  modelValue.value = item.id
  titleValue.value = item[titleFieldKey]
  data.value = []
  open.value = false
  callback()
}

const data = ref<Entry[]>([])


async function handleInput(value?: string) {
  searchValue.value = value || ''

  const idType = connectionEntryType?.config.idMethod?.type === 'number' ? '=' : 'contains'
  let filterKey = titleFieldKey || 'id'
  let filterOp = idType
  if (titleField) {
    filterKey = titleFieldKey
    filterOp = ["IntField", "DecimalField"].includes(titleField.fieldType as string) ? '=' : 'contains'
  }
  let filterValue: string | number = searchValue.value
  let filter = {}
  if (filterOp === '=') {

    filterValue = parseInt(searchValue.value)
    if (!isNaN(filterValue)) {
      filter = {
        [filterKey]: {
          op: filterOp,
          value: filterValue
        }
      }
    }
  }
  if (filterOp === 'contains' && filterValue) {
    filter = {
      [filterKey]: {
        op: filterOp,
        value: filterValue
      }
    }
  }

  const results = await easyApi.getList(props.field.connectionEntryType!, {
    columns: [titleFieldKey, 'id'],
    limit: 20,
    filter,
    orderBy: 'id',
    order: "desc"
  })

  data.value = results.data
}
</script>

<style lang="scss">
.connection-input {


}

</style>
