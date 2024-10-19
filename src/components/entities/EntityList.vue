<template>
  <ContainerPadded class="entity-list-wrapper">
    <div class="title-3">
      {{ entityDef?.config.label }}
    </div>
    <CardWidget>

      <Container class="list-header col horizontal-align-between">
        <EntitySearchInput :entity="entityDef" @search="handleSearch"/>

        <div>

          <ButtonIcon :label="`New ${entity}`" @click="openNewEntityModal" icon="add" size="1"/>
        </div>

      </Container>

    </CardWidget>
    <div class="label text-end">
      Loaded {{ loader.listInfo.itemsLoaded }} of {{ loader.listInfo.totalCount }} records
    </div>
    <div class="grid standard-grid-no-padding list-wrapper">

      <div ref="infinite"

           class="grid standard-grid-no-padding list-container row  infinite overflow-hidden ">
        <TransitionList fade>

          <EntityListItem v-for="item in loader.entityList.value" :active="activeEntity==item.id"
                          :key="item.id"
                          :entityDef="entityDef!"
                          :fields="filteredListFields"
                          :record="<EntityRecord>item" @select="(value)=>$emit('select',value)"/>
        </TransitionList>

      </div>
    </div>
    <ModalView v-model="showNewEntityModal">
      <NewEntityForm :entityDef="loader.entity" @close="closeNewEntityModal"/>
    </ModalView>
  </ContainerPadded>
</template>

<script setup lang="ts">
import Container from "@/components/layout/Container.vue";
import { entityStore } from "@/stores/entityStore.ts";
import type { EasyField } from "@vef/types/mod.ts";
import { AdvancedFilter, EntityDefinition, EntityRecord } from "@vef/types/mod.ts";
import { onBeforeMount, onBeforeUnmount, onMounted, ref, useTemplateRef } from "vue";
import EntityListItem from "@/views/entity/EntityListItem.vue";
import ButtonIcon from "@/components/buttons/ButtonIcon.vue";
import CardWidget from "@/components/widgets/CardWidget.vue";
import ModalView from "@/components/modal/ModalView.vue";
import NewEntityForm from "@/components/entities/NewEntityForm.vue";
import ContainerPadded from "@/components/layout/ContainerPadded.vue";
import { listenForList } from "@/realtime/index.ts";
import { EntityListLoader } from "@/components/entities/listLoader.ts";
import TransitionList from "@/components/transitions/TransitionList.vue";
import EntitySearchInput from "@/components/entities/EntitySearchInput.vue";

const loader = new EntityListLoader()
const props = defineProps<{
  entity: string,
  activeEntity?: string
}>()
let entityDef = ref<EntityDefinition>()

function openNewEntityModal() {
  showNewEntityModal.value = true
}

function closeNewEntityModal() {
  showNewEntityModal.value = false
}

function handleSearch(filter: Record<string, AdvancedFilter>) {
  loader.listOptions.orFilter = filter
  loader.loadList()

}

const showNewEntityModal = ref(false)


let filteredListFields: EasyField[] = []
const emit = defineEmits<{
  select: [id: string]
}>()


onBeforeMount(async () => {

  const entity = entityStore.entities.find(e => e.entityId === props.entity)

  if (!entity) {
    return
  }
  entityDef.value = entity
  loader.entity = entity
  const connectionTitleFields = entity.fields.filter(f => f.connectionTitleField).map(f => f.connectionTitleField)
  filteredListFields = entity.fields.filter(f => {
    if (!entity.listFields.includes(f.key)) {
      return false
    }
    if (['id', 'createdAt', 'updatedAt', entity.config.titleField].includes(f.key)) {
      return false
    }
    return !connectionTitleFields.includes(f.key)
  })

})
listenForList(props.entity, async (action, record) => {
  switch (action) {
    case 'create':
      await handleResize()
      break
    case 'update':
      let inList = false
      loader.entityList.value.forEach((e, i) => {
        if (e.id === record.id) {
          inList = true
          loader.entityList.value[i] = record
        }
      })
      if (!inList) {
        await handleResize()
      }
      break
    case 'delete':
      loader.entityList.value = loader.entityList.value.filter(e => e.id !== record.id)
      break
  }
})


// infinite scroll stuff
const infinite = useTemplateRef<HTMLElement>('infinite')

const rowGap = 3
const rowGapPx = `${rowGap}px`
const listHeight = ref<string>('0')
const itemHeightBase = 50
const itemHeight = itemHeightBase + rowGap

const itemHeightPx = `${itemHeightBase}px`
onMounted(async () => {
  await loader.init(entityDef.value as EntityDefinition)
  const parent = infinite.value?.parentElement
  if (parent) {
    await resetContainer(parent)
  }
  window.addEventListener('resize', handleResize)
  parent?.addEventListener('scroll', handleInfiniteScroll)
})

onBeforeUnmount(() => {

  const parent = infinite.value?.parentElement
  parent?.removeEventListener('scroll', handleInfiniteScroll)
  window.removeEventListener('resize', handleResize)
})


async function handleInfiniteScroll(e: Event) {

  const el = e.currentTarget as HTMLElement
  const scrollPosition = el.scrollTop
  const lastItemToLoad = Math.floor(scrollPosition / itemHeight + loader.listInfo.itemsPerPage)
  if (lastItemToLoad + 3 > loader.listInfo.itemsLoaded.value) {
    await loader.loadMore(lastItemToLoad)
    setTimeout(validateLoadedList, 500)
  }
}

async function validateLoadedList() {
  const scrollPosition = infinite.value?.parentElement?.scrollTop as number
  let lastItemToLoad = Math.floor(scrollPosition / itemHeight + loader.listInfo.itemsPerPage)
  if (lastItemToLoad > loader.listInfo.totalCount.value) {
    lastItemToLoad = loader.listInfo.totalCount.value
  }
  if (lastItemToLoad > loader.listInfo.itemsLoaded.value) {
    await loader.loadMore(lastItemToLoad)
  }
}

async function handleResize() {
  await resetContainer(infinite.value?.parentElement as HTMLElement)
}

async function resetContainer(parentEl: HTMLElement) {
  const rect = parentEl.getBoundingClientRect()
  const itemsPerPage = Math.floor(rect.height / itemHeight)
  loader.listInfo.itemsPerPage = itemsPerPage * 2
  parentEl.scrollTop = 0
  loader.reset()
  await loader.loadList()
  listHeight.value = `${loader.listInfo.totalCount.value * itemHeight}px`

}
</script>

<style lang="scss">
.entity-list-wrapper {
  grid-template-areas: "." "list-header" "." "list-container";
  grid-template-columns: 1fr;
  grid-template-rows: max-content max-content max-content 1fr;

  .list-header {
    grid-area: list-header;
  }

  .list-wrapper {
    grid-area: list-container;
  }

  .list-container {
    grid-auto-flow: row;
    grid-auto-rows: v-bind(itemHeightPx);
    row-gap: v-bind(rowGapPx);

  }

  .infinite {
    height: v-bind(listHeight);
    position: relative;
  }
}

</style>
