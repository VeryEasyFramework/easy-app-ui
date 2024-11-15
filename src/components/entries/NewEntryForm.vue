<template>
  <ContainerPadded class="row-gap-4">
    <div class="title-3">
      New {{ entryType.config.label }}
    </div>
    <form @submit.prevent>

      <Container class="col-2 row-gap-4 column-gap-3">
        <EasyInput v-for="(field,index) in entryType.fields.filter(f=>f.required)"
                   :focus="index==0"
                   :field="field"
                   editable
                   :error="errors[field.key]"
                   v-model="newEntry[field.key]"
                   :key="field.key"
        />
      </Container>
    </form>
    <Container class="col shrink horizontal-align-center">
      <ButtonIcon @click="close" icon="close" color="error" size="1"/>
      <ButtonIcon type="submit" @click.prevent="createEntry" icon="check"
                  color="success" size="1"/>
    </Container>
  </ContainerPadded>
</template>

<script setup lang="ts">

import ButtonIcon from "@/components/buttons/ButtonIcon.vue";
import EasyInput from "@/components/inputs/EasyInput.vue";
import Container from "@/components/layout/Container.vue";
import type { EasyField, EntryType } from "@vef/types/mod.ts";
import { easyApi } from "@/api/index.ts";
import { onMounted, ref } from "vue";
import ContainerPadded from "@/components/layout/ContainerPadded.vue";
import { listenForKeyPress } from "@/utils/keyboard.ts";

function close() {
  emit('close')
}

async function createEntry() {
  if (!validate()) {
    return
  }
  const result = await easyApi.createEntry(props.entryType.entryType, newEntry.value)
  if (result) {
    close()
  }
}

let requiredFields: EasyField[] = []

function validate() {
  let validated = true
  errors.value = {}
  requiredFields.forEach((f: EasyField) => {
    if (!newEntry.value[f.key]) {
      errors.value[f.key] = 'This field is required.'
      validated = false
    }
  })
  return validated
}

const props = defineProps<{
  entryType: EntryType
}>()

const newEntry = ref<Record<string, any>>({})
const errors = ref<Record<string, string>>({})

const emit = defineEmits<{
  close: []
}>()

listenForKeyPress((e) => {
  if (e.key === 'Escape') {
    close()
  }
  if (e.key === 'Enter') {
    createEntry()
  }
})

onMounted(() => {
  requiredFields = props.entryType.fields.filter((f: EasyField) => f.required)
  requiredFields.forEach((f: EasyField) => {
    if (f.defaultValue) {
      newEntry.value[f.key] = f.defaultValue
    }
  })
})
</script>
