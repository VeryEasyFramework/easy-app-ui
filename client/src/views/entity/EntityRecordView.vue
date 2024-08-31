<template>
  <TransitionFade>
    <ContainerPadded v-if="state.loaded.value" class="position-relative entity-record-grid">
      <Container class="top-bar col shrink vertical-align-center horizontal-align-between">
        <div class="title-4">
          {{ record[entityDef.titleField || 'id'] }}
        </div>
        <Container class="toolbar col shrink">
          <ButtonIcon @click="editMode = !editMode" :icon="editMode?'edit_off':'edit'"
                      label="Edit Mode"
                      color="warning" size="1"/>
          <ButtonIcon v-if="editMode" icon="save" size="1" color="success"
                      @click="editMode = false"/>
          <ButtonIcon icon="delete" size="1" color="error" @click=""/>
        </Container>
      </Container>

      <CardWidget class="fields">
        <EntityRecordFields :edit="editMode" :record="record!" :entityDef="entityDef"/>
      </CardWidget>
      <Container class="info">
        <EntityInfo :entityDef="entityDef" :record="record!"/>
      </Container>
      <Container class="actions">
        <EntityActions :entityDef="entityDef" :record="record!"/>
      </Container>


    </ContainerPadded>
  </TransitionFade>
</template>

<script setup lang="ts">

import CardWidget from "@/components/widgets/CardWidget.vue";
import {onBeforeMount, onMounted, ref} from "vue";
import type {Entity, EntityDefinition} from "@/types/index.ts";
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

const props = defineProps<{
  entity: string
  id: string
}>()
let entityDef: EntityDefinition = {} as EntityDefinition
const record = ref<Entity>()
const state = {
  loaded: ref(false)
}

const editMode = ref(false)

async function loadRecord() {
  state.loaded.value = false

  record.value = await easyApi.getEntity(props.entity, props.id)
  state.loaded.value = true
}


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
