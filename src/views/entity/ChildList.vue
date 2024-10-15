<template>
  <Container class="row shrink child-list">
    <Container class="col shrink vertical-align-center">

      <div class="title-5 text-primary">{{ child.label }}</div>

      <ButtonIcon class="add-button" icon="add" size="0.8" @click="addRecord"/>
    </Container>
    <ContainerPadded class="row shrink card dark">
      <Container class="col">
        <div class="label" v-for="field in displayFields" :key="field.key">
          {{ field.label }}
        </div>
      </Container>
      <Container class="col child-record card" v-for="(row, index) in data" :key="row.id">

        <div v-for="field in displayFields" :key="`${row.id}${field.key}`">
          <ChildInput :field="field"
                      @selected="(value)=>handleSelectedConnection(value,field,row)"
                      v-model="row[field.key]"
                      v-model:titleValue="row[field.connectionTitleField? field.connectionTitleField:'']"
                      :key="field.key"/>
        </div>
        <div>{{ row.order }}</div>
        <ButtonIcon icon="delete" @click="removeRow(index)" size="0.8"/>
      </Container>

    </ContainerPadded>

  </Container>
</template>

<script setup lang="ts">

import {EasyField} from "@vef/easy-api/src/types.ts";
import Container from "@/components/layout/Container.vue";
import {computed, onMounted, ref} from "vue";
import ContainerPadded from "@/components/layout/ContainerPadded.vue";
import ButtonIcon from "@/components/buttons/ButtonIcon.vue";
import ChildInput from "@/components/inputs/ChildInput.vue";
import {easyApi} from "@/api/index.ts";

export interface ChildListConfig {
  tableName: string;
}

interface ChildListDefinition {
  childName: string;
  label: string;
  fields: EasyField[];
  config: ChildListConfig;
}

interface ChildRecord {
  id: string;
  order: number;

  [key: string]: any
}

const props = defineProps<{
  child: ChildListDefinition
  modelValue: ChildRecord[]
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: ChildRecord[]): void
}>()

const data = ref<ChildRecord[]>([])

onMounted(() => {
  data.value = props.modelValue
})

const displayFields = computed(() => {
  const titleKeys = props.child.fields.filter(field => field.connectionTitleField).map(field => field.connectionTitleField)
  return props.child.fields.filter(field => {
    if (titleKeys.includes(field.key)) {
      return false
    }
    if (field.hidden) {
      return false
    }
    return true

  })
})

function updateOrder() {
  const newRows = data.value!.map((row, index) => {
    row.order = index
    return row
  })
  data.value = newRows

}

async function handleSelectedConnection(value: string, field: EasyField, row: ChildRecord) {
  const fetchFields = props.child.fields.filter(f => f.fetchOnCreate?.idKey === field.key)
  if (fetchFields.length === 0) {
    return
  }


  const record = await easyApi.getEntity(field.connectionEntity!, value)

  fetchFields.forEach((f) => {
    row[f.key] = record[f.fetchOnCreate!.field]
  })


}

function removeRow(index: number) {
  data.value = data.value!.filter((row, i) => i !== index)
  updateOrder()
  emit('update:modelValue', data.value)
}

function addRecord() {
  const fields = props.child.fields;

  const newRecord: ChildRecord = {
    id: '',
    order: data.value!.length
  }

  fields.forEach(field => {
    newRecord[field.key] = field.defaultValue
  })

  data.value.push(newRecord)
  updateOrder()
  emit('update:modelValue', data.value)

}

</script>

<style lang="scss">
.child-list {
  .child-record {
    //height: var(--line-height);
  }

  .add-button {
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>
