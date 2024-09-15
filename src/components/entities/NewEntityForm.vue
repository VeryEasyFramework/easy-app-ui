<template>
  <ContainerPadded class="row-gap-4">
    <div class="title-3">
      New {{ entityDef.label }}
    </div>
    <form @submit.prevent>

      <Container class="col-2 row-gap-4 column-gap-3">
        <EasyInput v-for="(field,index) in entityDef.fields.filter(f=>f.required)"
                   :focus="index==0"
                   :field="field"
                   :error="errors[field.key]"
                   v-model="newEntity[field.key]"
                   :key="field.key"
        />
      </Container>
    </form>
    <Container class="col shrink horizontal-align-center">
      <ButtonIcon @click="close" icon="close" color="error" size="1"/>
      <ButtonIcon type="submit" @click.prevent="createEntity" icon="check"
                  color="success" size="1"/>
    </Container>
  </ContainerPadded>
</template>

<script setup lang="ts">

import ButtonIcon from "@/components/buttons/ButtonIcon.vue";
import EasyInput from "@/components/inputs/EasyInput.vue";
import Container from "@/components/layout/Container.vue";
import type {EntityDefinition} from "@/types/index.ts";
import {easyApi} from "@/api/index.ts";
import {onMounted, ref} from "vue";
import {EasyField} from "@/types/easyField.ts";
import ContainerPadded from "@/components/layout/ContainerPadded.vue";
import {listenForKeyPress} from "@/utils/keyboard.ts";

function close() {
  emit('close')
}

async function createEntity() {
  if (!validate()) {
    return
  }
  const result = await easyApi.createEntity(props.entityDef.entityId, newEntity.value)
  if (result) {
    close()
  }
}

let requiredFields: EasyField[] = []

function validate() {
  let validated = true
  errors.value = {}
  requiredFields.forEach((f: EasyField) => {
    if (!newEntity.value[f.key]) {
      errors.value[f.key] = 'This field is required.'
      validated = false
    }
  })
  return validated
}

const props = defineProps<{
  entityDef: EntityDefinition
}>()

const newEntity = ref<Record<string, any>>({})
const errors = ref<Record<string, string>>({})

const emit = defineEmits<{
  close: []
}>()

listenForKeyPress((e) => {
  if (e.key === 'Escape') {
    close()
  }
  if (e.key === 'Enter') {
    createEntity()
  }
})

onMounted(() => {
  requiredFields = props.entityDef.fields.filter((f: EasyField) => f.required)
  requiredFields.forEach((f: EasyField) => {
    if (f.defaultValue) {
      newEntity.value[f.key] = f.defaultValue
    }
  })
})
</script>
