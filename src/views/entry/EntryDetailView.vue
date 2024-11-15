<template>
  <TransitionFade>
    <ContainerPadded v-if="state.loaded.value" class="position-relative entry-grid">
      <Container class="top-bar col shrink vertical-align-center horizontal-align-between">
        <Container>

          <div class="title-4">
            {{ entry[entryType.config.titleField || 'id'] }}
          </div>
          <div class="text-small italic text-primary-bright">
            {{ entry.id }}
          </div>
          <div class="choice" v-if="entryType.statusField">
            <DisplayChoices :value="entry[entryType.statusField.key]"
                            :field="entryType.statusField"/>
          </div>
        </Container>
        <Container class="col shrink">
          <div class="fit-content">

            <RecordAttendance :users="roomUsers"/>
          </div>
          <EntryToolbar :editMode="editMode" @save="saveRecord" @delete="deleteRecord"
                        @edit="(edit)=>editMode=edit"/>
        </Container>
      </Container>

      <ContainerPadded class="fields">
        <Container class="row shrink ">

          <EntryFieldGroup v-for="group in entryType.fieldGroups.filter(g=>g.key!=='default')"
                           :edit="editMode"
                           :group="group" :entry="entry"
                           :key="group.key"/>
          <EntryFieldGroup v-for="group in entryType.fieldGroups.filter(g=>g.key ==='default')"
                           :edit="editMode"
                           :group="group" :entry="entry"
                           :key="group.key"/>

        </Container>
      </ContainerPadded>
      <Container class="info">
        <EntryInfoComponent :entry-type="entryType" :entry="entry!"/>
      </Container>
      <Container class="actions">
        <EntryActions :entry-type="entryType" :entry="entry!" type="entry"/>
      </Container>

      <Container class="children">
        <ChildList v-for="child in entryType.children" :child="child as ChildListDefinition"
                   v-model="entry[child.childName]"/>
      </Container>
      <Container class="editLog vertical-align-end">
        <CardWidget class="h-100">

          <EntryEditLog :edit-log="entryInfo.editLog"/>
        </CardWidget>
      </Container>

      <LoaderOverlay :loaded="!state.saving.value"/>
    </ContainerPadded>
  </TransitionFade>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';

import type { EasyField, Entry, EntryInfo, EntryType, User } from "@vef/types/mod.ts";
import { easyApi } from "@/api/index.ts";
import { router } from "@/router/index.ts";
import { joinRecord } from "@/realtime/index.ts";
import { notify } from "@/notify/index.ts";
import { entryTypeStore } from "@/stores/entryTypeStore.ts";
import Container from "@/components/layout/Container.vue";
import DisplayChoices from "@/components/displayFields/DisplayChoices.vue";
import ContainerPadded from "@/components/layout/ContainerPadded.vue";
import EntryActions from "@/components/entries/entry/EntryActions.vue";
import ChildList from "@/views/entry/ChildList.vue";
import CardWidget from "@/components/widgets/CardWidget.vue";
import EntryEditLog from "@/components/entries/entry/EntryEditLog.vue";
import LoaderOverlay from "@/components/transitions/LoaderOverlay.vue";
import EntryToolbar from "@/components/entries/entry/EntryToolbar.vue";
import RecordAttendance from "@/components/realtime/RecordAttendance.vue";
import TransitionFade from "@/components/transitions/TransitionFade.vue";
import EntryFieldGroup from "@/components/entries/entry/EntryFieldGroup.vue";
import EntryInfoComponent from "@/components/entries/entry/EntryInfo.vue";

const props = defineProps<{
  entryType: string
  id: string
}>()

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

let entryType: EntryType = {} as EntryType
const entry = ref<Entry>({} as Entry)
const entryInfo = ref<EntryInfo>({
  editLog: [],
})
const state = {
  loaded: ref(false),
  saving: ref(false),
}

const editMode = ref(false)

async function loadRecord() {
  state.loaded.value = false

  entry.value = await easyApi.getEntry(props.entryType, props.id)
  state.loaded.value = true
}

async function loadRecordInfo() {
  entryInfo.value = await easyApi.getEntryInfo(props.entryType, props.id)
}

async function saveRecord() {
  if (!entry.value) {
    return
  }
  state.saving.value = true

  await easyApi.updateEntry(props.entryType, entry.value.id, entry.value)

  state.saving.value = false
}

async function deleteRecord() {
  if (!entry.value) {
    return
  }
  state.saving.value = true
  await easyApi.deleteEntry(props.entryType, entry.value.id)
  state.saving.value = false
  await router.push(`/entry/${props.entryType}`)
}

function handleUserAttendance(event: "join" | "leave", data: any) {
  const user = data.user as User
  const users = data.users as User[]

  roomUsers.value = users

  const action = event === 'join' ? 'joined' : 'left'
  // notify({
  //   message: `${user.firstName} ${action} the record`,
  //   title: `User ${action}`,
  //   type: event === 'join' ? 'success' : 'warning'
  // })
}

const roomUsers = ref<User[]>([])
joinRecord(props.entryType, props.id, (event, data) => {
  switch (event) {
    case "update":
      entry.value = data
      notify({
        message: `${entryType.config.label} ${entry.value[entryType.config.titleField || 'id']} was updated`,
        title: `${entryType.config.label} Updated`,
        type: 'success'
      })
      break;
    case "delete":
      router.push(`/entry/${props.entryType}`)
      break;
    case "join":
      handleUserAttendance("join", data)
      break;
    case "leave":
      handleUserAttendance("leave", data)

  }
})


onBeforeMount(() => {
  // load record
  if (!props.id || !props.entryType) {
    return router.push('/entry')
  }
  const def = entryTypeStore.get(props.entryType)
  if (!def) {
    return router.push('/entry')
  }
  entryType = def
})


onMounted(async () => {
  // load record
  await loadRecord()
  await loadRecordInfo()
})
</script>

<style lang="scss">

.entry-grid {
  grid-template-columns: 2fr 1fr;
  grid-template-rows: max-content max-content  max-content 1fr;
  grid-template-areas:
  "top-bar top-bar"
  "fields info"
  "fields actions"
  "children children"
  "editLog editLog";

  .fields {
    grid-area: fields;
    grid-template-columns: max-content;;

  }

  .top-bar {
    grid-area: top-bar;
  }

  .toolbar {
  }

  .info {
    grid-area: info;
  }

  .actions {
    grid-area: actions;
  }

  .children {
    grid-area: children;
  }

  .editLog {
    grid-area: editLog;

    .card {
      max-height: 300px;
      width: max-content;
    }
  }
}

</style>
