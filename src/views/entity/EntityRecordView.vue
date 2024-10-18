<template>
  <TransitionFade>
    <ContainerPadded v-if="state.loaded.value" class="position-relative entity-record-grid">
      <Container class="top-bar col shrink vertical-align-center horizontal-align-between">
        <Container>

          <div class="title-4">
            {{ record[entityDef.config.titleField || 'id'] }}
          </div>
          <div class="text-small italic text-primary-bright">
            {{ record.id }}
          </div>
          <div class="choice" v-if="entityDef.statusField">
            <DisplayChoices :value="record[entityDef.statusField.key]"
                            :field="entityDef.statusField"/>
          </div>
        </Container>
        <Container class="col shrink">
          <div class="fit-content">

            <RecordAttendance :users="roomUsers"/>
          </div>
          <EntityToolbar :editMode="editMode" @save="saveRecord" @delete="deleteRecord"
                         @edit="(edit)=>editMode=edit"/>
        </Container>
      </Container>

      <ContainerPadded class="fields">
        <!--        <EntityRecordFields :edit="editMode" :record="record!" :entityDef="entityDef"/>-->
        <Container class="row shrink ">

          <EntityFieldGroup v-for="group in entityDef.fieldGroups.filter(g=>g.key!=='default')"
                            :edit="editMode"
                            :group="group" :record="record"
                            :key="group.key"/>
          <EntityFieldGroup v-for="group in entityDef.fieldGroups.filter(g=>g.key ==='default')"
                            :edit="editMode"
                            :group="group" :record="record"
                            :key="group.key"/>

        </Container>
      </ContainerPadded>
      <Container class="info">
        <EntityInfo :entityDef="entityDef" :record="record!"/>
      </Container>
      <Container class="actions">
        <EntityActions :entityDef="entityDef" :record="record!" type="entity"/>
      </Container>

      <Container class="children">
        <ChildList v-for="child in entityDef.children" :child="child as ChildListDefinition"
                   v-model="record[child.childName]"/>
      </Container>
      <Container class="editLog vertical-align-end">
        <CardWidget class="h-100">

          <EntityEditLog :edit-log="recordInfo.editLog"/>
        </CardWidget>
      </Container>

      <LoaderOverlay :loaded="!state.saving.value"/>
    </ContainerPadded>
  </TransitionFade>
</template>

<script setup lang="ts">

import CardWidget from "@/components/widgets/CardWidget.vue";
import { onBeforeMount, onMounted, ref } from "vue";
import type { EasyField, EntityDefinition, EntityRecord, RecordInfo } from "@vef/types/mod.ts";
import { User } from "@vef/types/mod.ts";
import Container from "@/components/layout/Container.vue";
import LoaderOverlay from "@/components/transitions/LoaderOverlay.vue";
import { router } from "@/router/index.ts";
import { easyApi } from "@/api/index.ts";
import TransitionFade from "@/components/transitions/TransitionFade.vue";
import { entityStore } from "@/stores/entityStore.ts";
import ContainerPadded from "@/components/layout/ContainerPadded.vue";
import EntityActions from "@/components/entities/entityRecord/EntityActions.vue";
import EntityInfo from "@/components/entities/entityRecord/EntityInfo.vue";
import EntityToolbar from "@/components/entities/entityRecord/EntityToolbar.vue";
import { joinRecord } from "@/realtime/index.ts";
import EntityFieldGroup from "@/components/entities/entityRecord/EntityFieldGroup.vue";
import EntityEditLog from "@/components/entities/entityRecord/EntityEditLog.vue";
import ChildList from "@/views/entity/ChildList.vue";
import DisplayChoices from "@/components/displayFields/DisplayChoices.vue";
import { notify } from "@/notify/index.ts";
import RecordAttendance from "@/components/realtime/RecordAttendance.vue";

const props = defineProps<{
  entity: string
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

let entityDef: EntityDefinition = {} as EntityDefinition
const record = ref<EntityRecord>({} as EntityRecord)
const recordInfo = ref<RecordInfo>({
  editLog: [],
})
const state = {
  loaded: ref(false),
  saving: ref(false),
}

const editMode = ref(false)

async function loadRecord() {
  state.loaded.value = false

  record.value = await easyApi.getEntity(props.entity, props.id)
  state.loaded.value = true
}

async function loadRecordInfo() {
  recordInfo.value = await easyApi.getRecordInfo(props.entity, props.id)
}

async function saveRecord() {
  if (!record.value) {
    return
  }
  state.saving.value = true
  const entity = record.value
  await easyApi.updateEntity(props.entity, entity.id, entity)

  state.saving.value = false
}

async function deleteRecord() {
  if (!record.value) {
    return
  }
  state.saving.value = true
  await easyApi.deleteEntity(props.entity, record.value.id)
  state.saving.value = false
  await router.push(`/entity/${props.entity}`)
}

function handleUserAttendance(event: "join" | "leave", data: any) {
  const user = data.user as User
  const users = data.users as User[]

  roomUsers.value = users

  const action = event === 'join' ? 'joined' : 'left'
  notify({
    message: `${user.firstName} ${action} the record`,
    title: `User ${action}`,
    type: event === 'join' ? 'success' : 'warning'
  })
}

const roomUsers = ref<User[]>([])
joinRecord(props.entity, props.id, (event, data) => {
  console.log('event', event, data)
  switch (event) {
    case "update":
      console.log(data)
      console.log(Object.keys(data))
      record.value = data
      notify({
        message: `${entityDef.config.label} ${record.value[entityDef.config.titleField || 'id']} was updated`,
        title: `${entityDef.config.label} Updated`,
        type: 'success'
      })
      break;
    case "delete":
      router.push(`/entity/${props.entity}`)
      break;
    case "join":
      handleUserAttendance("join", data)
      break;
    case "leave":
      handleUserAttendance("leave", data)

  }
})

// listenForEntity(props.entity, 'update', async (data) => {
//   if (data.id === props.id) {
//     record.value = data
//     notify({
//       message: `${entityDef.config.label} ${record.value[entityDef.config.titleField || 'id']} was updated`,
//       title: `${entityDef.config.label} Updated`,
//       type: 'success'
//     })
//   }
// })

onBeforeMount(() => {
  // load record
  if (!props.id || !props.entity) {
    return router.push('/entity')
  }
  const def = entityStore.getDef(props.entity)
  if (!def) {
    return router.push('/entity')
  }
  entityDef = def
})


onMounted(async () => {
  // load record
  await loadRecord()
  await loadRecordInfo()
})
</script>

<style lang="scss">

.entity-record-grid {
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
