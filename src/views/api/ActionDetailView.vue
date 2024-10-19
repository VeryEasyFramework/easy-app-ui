<template>

  <Container class="action-detail">
    <Container class="header">

      <Container class="row shrink horizontal-align-center">

        <div class="title-4 text-center">

          {{ formatString(action.actionName, 'titleCase', 'camelCase') }}
        </div>
        <div class="text-small text-center">{{ action.description }}</div>
      </Container>

    </Container>

    <div class="buttons horizontal-align-self-center">

      <ButtonIcon icon="play_arrow" color="secondary"
                  label="Run Action" @click="handleActionClick"/>
    </div>
    <Container class="results">


      <DisplayJSON :value="actionResults"/>
    </Container>
    <ModalView v-model="showActionForm">
      <ActionInputForm :action="action" @cancel="showActionForm=false" @submitted="handleSubmit"/>
    </ModalView>
  </Container>

</template>

<script setup lang="ts">

import { formatString } from "@/utils/index.ts";
import ButtonIcon from "@/components/buttons/ButtonIcon.vue";
import Container from "@/components/layout/Container.vue";
import ModalView from "@/components/modal/ModalView.vue";
import ActionInputForm from "@/views/api/ActionInputForm.vue";
import { DocsAction } from "@vef/types/mod.ts";
import { ref } from "vue";
import { easyApi } from "@/api/index.ts";
import DisplayJSON from "@/components/displayFields/DisplayJSON.vue";

const showActionForm = ref(false)
const runningAction = ref(false)
const actionResults = ref<Record<string, any> | null>(null)
const formattedResults = ref<string>("")

const props = defineProps<{
  groupName: string
  action: DocsAction
}>()

async function handleActionClick() {
  if (props.action.params.length > 0) {
    showActionForm.value = true
    return
  }
  await runAction()
}

async function handleSubmit(values: Record<string, any>) {
  await runAction(values)
  showActionForm.value = false
}

async function runAction(values?: Record<string, any>) {
  runningAction.value = true
  actionResults.value = await easyApi.call(props.groupName, props.action.actionName, values)
  runningAction.value = false
}

</script>

<style lang="scss">
.action-detail {
  grid-template-areas: "header buttons" "results results";

  grid-template-columns: 1fr 1fr;
  grid-template-rows: max-content 1fr;

  .header {
    grid-area: header;
  }

  .buttons {
    grid-area: buttons;
  }

  .results {
    grid-area: results;
  }
}
</style>
