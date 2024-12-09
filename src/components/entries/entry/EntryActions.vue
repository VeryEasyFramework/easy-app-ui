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
          <ButtonIcon icon="queue_play_next" color="info" @click="handleAction(action,true)"
                      :label="action.label" key="queue"/>
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
        <Form name="actionParamsForm"
              @submitted="async  ()=> await submitAction(currentAction,enqueue)">
          <Container class="row row-gap-4">

            <Container>

              <div v-for="param in currentAction.params" :key="param.key">
                <EasyInput :field="param" :editable="true"
                           v-model="currentActionParams[param.key].value"
                           :error="currentActionParams[param.key].error"/>

              </div>
            </Container>
            <Container class="col shrink horizontal-align-center gap-3">

              <ButtonIcon icon="cancel" color="error" @click="showActionParams = false"
                          label="Cancel"/>
              <ButtonIcon :icon="enqueue?'queue_play_next':  'play_arrow'" type="submit"
                          :color="enqueue?'info': 'secondary'"

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
import type { Entry, EntryAction, EntryType, Settings, SettingsType } from "@vef/types/mod.ts";
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
  entryType: EntryType | SettingsType
  type: "entry" | "settings"
  entry: Entry | Settings
}>()

const actions = ref<EntryAction[]>([])

const currentAction = ref<EntryAction>({
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
const enqueue = ref(false)
onMounted(() => {
  actions.value = props.entryType.actions.filter((a: EntryAction) => !a.private) as EntryAction[]
})

async function handleAction(action: EntryAction, queue = false) {
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
    enqueue.value = queue
    return
  }

  await submitAction(action, queue)

}

async function submitAction(action: EntryAction, queue = false) {

  if (!validateParams(action, currentActionParams.value)) {
    return
  }
  const data: Record<string, any> = {}
  for (const key in currentActionParams.value) {
    data[key] = currentActionParams.value[key].value
  }

  let response: Record<string, any> = {}
  switch (props.type) {
    case "entry":
      response = await easyApi.call('entry', "runEntryAction", {
        entryType: (props.entryType as EntryType).entryType,
        id: (props.entry as Entry).id,
        action: action.key,
        data,
        enqueue: queue
      })
      break
    case "settings":
      response = await easyApi.call("settings", "runSettingsAction", {
        settingsType: (props.entryType as SettingsType).settingsType,
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
  enqueue.value = false
}

function validateParams(action: EntryAction, params: Record<string, {
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
