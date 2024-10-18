<template>
  <ContainerPadded class="row shrink">
    <div>
      <div class="title-4">Actions</div>
    </div>
    <Container class="row shrink">

      <CardWidget v-for="action in actions"
                  :key="action.key">

        <Container class="col-2 shrink vertical-align-center">
          <ButtonIcon icon="play_arrow" color="secondary" @click="handleAction(action)"
                      :label="action.label" key="play"/>
          <Container>
            <div class="title-5 text-accent">{{ action.label }}</div>
            <div class="text-small italic">{{ action.description }}</div>
          </Container>
        </Container>
      </CardWidget>

    </Container>
    <ModalView v-model="showActionParams">
      <ContainerPadded class="row row-gap-4">

        <div class="title-4 text-center">{{ currentAction.label || currentAction.key }}</div>
        <Form name="actionParamsForm" @submitted="async  ()=> await submitAction(currentAction)">
          <Container class="row row-gap-4">

            <Container>

              <div v-for="param in currentAction.params" :key="param.key">
                <EasyInput :field="param" editable v-model="currentActionParams[param.key].value"
                           :error="currentActionParams[param.key].error"/>

              </div>
            </Container>
            <Container class="col shrink horizontal-align-center gap-3">

              <ButtonIcon icon="cancel" color="error" @click="showActionParams = false"
                          label="Cancel"/>
              <ButtonIcon icon="play_arrow" type="submit" color="secondary"

                          :label="currentAction.label"/>
            </Container>
          </Container>
        </Form>
      </ContainerPadded>
    </ModalView>
  </ContainerPadded>
</template>

<script setup lang="ts">

import Container from "@/components/layout/Container.vue";
import type {
  EntityAction,
  EntityDefinition,
  EntityRecord,
  SettingsEntityDefinition,
  SettingsRecord
} from "@vef/types/mod.ts";
import { onMounted, ref } from "vue";
import ButtonIcon from "@/components/buttons/ButtonIcon.vue";
import CardWidget from "@/components/widgets/CardWidget.vue";
import ContainerPadded from "@/components/layout/ContainerPadded.vue";
import { easyApi } from "@/api/index.ts";
import { notify } from "@/notify/index.ts";
import ModalView from "@/components/modal/ModalView.vue";
import Form from "@/components/form/FormBase.vue";
import EasyInput from "@/components/inputs/EasyInput.vue";

const props = defineProps<{
  entityDef: EntityDefinition | SettingsEntityDefinition
  type: "entity" | "settings"
  record: EntityRecord | SettingsRecord
}>()

const actions = ref<EntityAction[]>([])

const currentAction = ref<EntityAction>({
  key: "",
  label: "",
  description: "",
  params: [],
  action: () => {
  }
})

const currentActionParams = ref<Record<string, {
  error?: string
  value: any
}>>({})
const showActionParams = ref(false)
onMounted(() => {
  actions.value = props.entityDef.actions.filter(a => !a.private) as EntityAction[]
})

async function handleAction(action: EntityAction) {
  currentAction.value = action
  if (action.params && action.params.length > 0) {
    currentActionParams.value = {}
    action.params.forEach(param => {
      currentActionParams.value[param.key] = {
        error: "",
        value: null
      }
    })
    showActionParams.value = true
    return
  }

  await submitAction(action)

}

async function submitAction(action: EntityAction) {

  if (!validateParams(action, currentActionParams.value)) {
    return
  }
  const data: Record<string, any> = {}
  for (const key in currentActionParams.value) {
    data[key] = currentActionParams.value[key].value
  }

  let response: Record<string, any> = {}
  switch (props.type) {
    case "entity":
      response = await easyApi.runEntityAction((props.entityDef as EntityDefinition).entityId, (props.record as EntityRecord).id, action.key, data)
      break
    case "settings":
      response = await easyApi.call("settings", "runSettingsAction", {
        settings: (props.entityDef as SettingsEntityDefinition).settingsId,
        action: action.key,
        data
      })
      break
  }

  notify({
    title: `Action ${action.label || action.key} completed`,
    message: response.message || response || "Action completed",
    type: 'success'
  })
  currentActionParams.value = {}
  currentAction.value = {
    key: "",
    label: "",
    description: "",
    params: [],
    action: () => {
    }
  }
  showActionParams.value = false
}

function validateParams(action: EntityAction, params: Record<string, {
  error?: string;
  value: any;
}>) {
  let hasError = false
  if (!action.params) {
    return true

  }
  for (const param of action.params) {
    if (param.required && !params[param.key].value) {
      params[param.key].error = "Please provide a value"
      hasError = true
      continue
    }
    params[param.key].error = ""
  }
  return !hasError
}
</script>

<style scoped>

</style>
