<template>
  <ContainerPadded class="entity-list-wrapper">
    <div class="title-3">
      {{ state.entityDef.label }}
    </div>
    <CardWidget>

      <Container class="list-header col horizontal-align-between">
        <div class="position-relative">

          <InputData name="search" placeholder="Search" focus/>
          <MaterialIcon class="position-absolute right pe-2 center-y" size="1.2" icon="search"/>
        </div>

        <div>

          <ButtonIcon :label="`New ${entity}`" @click="openNewEntityModal" icon="add" size="1"/>
        </div>

      </Container>
    </CardWidget>
    <Container class="list-container">
      <EntityListItem v-for="item in entityList" :active="activeEntity==item.id" :key="item.id"
                      :entityDef="state.entityDef"
                      :record="<Entity>item" @select="(value)=>$emit('select',value)"/>

    </Container>
    <ModalView v-model="showNewEntityModal">
      <NewEntityForm :entityDef="state.entityDef" @close="closeNewEntityModal"/>
    </ModalView>
  </ContainerPadded>
</template>

<script setup lang="ts">
import Container from "@/components/layout/Container.vue";
import {entityStore} from "@/stores/entityStore.ts";
import {EntityDefinition, Entity} from "@/types/index.ts";
import {onBeforeMount, onMounted, reactive, ref} from "vue";
import {easyApi} from "@/api/index.ts";
import EntityListItem from "@/views/entity/EntityListItem.vue";
import InputData from "@/components/inputs/InputData.vue";
import ButtonIcon from "@/components/buttons/ButtonIcon.vue";
import CardWidget from "@/components/widgets/CardWidget.vue";
import MaterialIcon from "@/components/icons/MaterialIcon.vue";
import ModalView from "@/components/modal/ModalView.vue";
import EasyInput from "@/components/inputs/EasyInput.vue";
import NewEntityForm from "@/components/entities/NewEntityForm.vue";
import ContainerPadded from "@/components/layout/ContainerPadded.vue";
import {listenForEntity, realtime} from "@/realtime/index.ts";

const props = defineProps<{
  entity: string,
  activeEntity?: string
}>()

function openNewEntityModal() {
  showNewEntityModal.value = true
}

function closeNewEntityModal() {
  showNewEntityModal.value = false
}


const showNewEntityModal = ref(false)
const entityList = ref<Entity[]>([])
const state = {
  entityDef: {} as EntityDefinition,
  loading: ref(true),
  totalCount: ref(0),
  currentCount: ref(0),
  listOptions: reactive({
    filter: {} as Record<string, string>,
    orderBy: '',
    order: 'asc' as 'asc' | 'desc',
    limit: 50,
    offset: 0
  })
}

const emit = defineEmits<{
  select: [id: string]
}>()

async function loadList() {
  const list = await easyApi.getList(props.entity, state.listOptions)
  entityList.value = list.data
  state.totalCount.value = list.totalCount
  state.currentCount.value = list.rowCount
}


onBeforeMount(async () => {
  const entity = entityStore.entities.find(e => e.entityId === props.entity)

  if (!entity) {
    return
  }
  state.entityDef = entity


  await loadList()
})

listenForEntity(props.entity, 'list', (data: Entity) => {
  entityList.value.forEach((e, i) => {
    if (e.id === data.id) {

      entityList.value[i] = data
    }
  })

})
</script>

<style lang="scss">
.entity-list-wrapper {
  grid-template-areas: "." "list-header" "list-container";
  grid-template-columns: 1fr;
  grid-template-rows: max-content max-content 1fr;

  .list-header {
    grid-area: list-header;
  }

  .list-container {

    grid-area: list-container;
    grid-template-rows: repeat(auto-fill, minmax(50px, 1fr));
  }
}

</style>
