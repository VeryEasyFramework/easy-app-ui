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
        </Container>
        <EntityToolbar :editMode="editMode" @save="saveRecord" @delete=""
                       @edit="(edit)=>editMode=edit"/>
      </Container>

      <ContainerPadded class="fields">
        <!--        <EntityRecordFields :edit="editMode" :record="record!" :entityDef="entityDef"/>-->
        <Container class="row shrink ">

          <EntityFieldGroup v-for="group in entityDef.fieldGroups.filter(g=>g.key!=='default')"
                            :group="group" :record="record"
                            :key="group.key"/>
          <EntityFieldGroup v-for="group in entityDef.fieldGroups.filter(g=>g.key ==='default')"
                            :group="group" :record="record"
                            :key="group.key"/>
        </Container>
      </ContainerPadded>
      <Container class="info">
        <EntityInfo :entityDef="entityDef" :record="record!"/>
      </Container>
      <Container class="actions">
        <EntityActions :entityDef="entityDef" :record="record!"/>
      </Container>

      <LoaderOverlay :loaded="!state.saving.value"/>
    </ContainerPadded>
  </TransitionFade>
</template>

<script setup lang="ts">

import CardWidget from "@/components/widgets/CardWidget.vue";
import {onBeforeMount, onMounted, ref} from "vue";
import type {EntityRecord, EntityDefinition} from "@/types/index.ts";
import Container from "@/components/layout/Container.vue";
import LoaderOverlay from "@/components/transitions/LoaderOverlay.vue";
import {router} from "@/router/index.ts";
import {easyApi} from "@/api/index.ts";
import TransitionFade from "@/components/transitions/TransitionFade.vue";
import {entityStore} from "@/stores/entityStore.ts";
import EasyInput from "@/components/inputs/EasyInput.vue";
import EntityRecordFields from "@/components/entities/entityRecord/EntityRecordFields.vue";
import ButtonIcon from "@/components/buttons/ButtonIcon.vue";
import ContainerPadded from "@/components/layout/ContainerPadded.vue";
import EntityActions from "@/components/entities/entityRecord/EntityActions.vue";
import EntityInfo from "@/components/entities/entityRecord/EntityInfo.vue";
import EntityToolbar from "@/components/entities/entityRecord/EntityToolbar.vue";
import Loader from "@/components/transitions/Loader.vue";
import {notify} from "@/notify/index.ts";
import {listenForEntity} from "@/realtime/index.ts";
import EntityFieldGroup from "@/components/entities/entityRecord/EntityFieldGroup.vue";

const props = defineProps<{
  entity: string
  id: string
}>()
let entityDef: EntityDefinition = {} as EntityDefinition
const record = ref<EntityRecord>({} as EntityRecord)
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

async function saveRecord() {
  if (!record.value) {
    return
  }
  state.saving.value = true
  const entity = record.value
  await easyApi.updateEntity(props.entity, entity.id, entity)

  state.saving.value = false
}

listenForEntity(props.entity, 'update', async (data) => {
  if (data.id === props.id) {
    record.value = data
    notify({
      message: `${entityDef.config.label} ${record.value[entityDef.config.titleField || 'id']} was updated`,
      title: `${entityDef.config.label} Updated`,
      type: 'success'
    })
  }
})

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
})
</script>

<style lang="scss">

.entity-record-grid {
  grid-template-columns: 2fr 1fr;
  grid-template-rows: max-content max-content 1fr;
  grid-template-areas: "top-bar top-bar" "fields info" "fields actions";

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
}

</style>
