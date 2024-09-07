<template>
  <ContainerPadded class="entity-list-wrapper">
    <div class="title-3">
      {{ entityDef?.config.label }}
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
    <div class="label">
      Loaded {{ loader.listInfo.itemsLoaded }} of {{ loader.listInfo.totalCount }} records
    </div>
    <div class="grid standard-grid-no-padding list-wrapper">

      <div ref="infinite"

           class="grid standard-grid-no-padding list-container row  infinite">
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
import {entityStore} from "@/stores/entityStore.ts";
import {EntityDefinition, EntityRecord} from "@/types/index.ts";
import {
  computed,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  useTemplateRef
} from "vue";
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
import {listenForKeyPress, onControlN} from "@/utils/keyboard.ts";
import {notify} from "@/notify/index.ts";
import {ListOptions} from "@/api/apiTypes.ts";
import {EntityListLoader} from "@/components/entities/listLoader.ts";
import TransitionList from "@/components/transitions/TransitionList.vue";

const loader = new EntityListLoader()
const props = defineProps<{
  entity: string,
  activeEntity?: string
}>()
const entityDef = ref<EntityDefinition | null>(null)

function openNewEntityModal() {
  showNewEntityModal.value = true
}

function closeNewEntityModal() {
  showNewEntityModal.value = false
}

// const searchString = computed({
//   // get: () => loader.listOptions.filter.search,
//   // set: (value) => state.listOptions.filter.search = value
// })

const showNewEntityModal = ref(false)

// const state = {
//   entityDef: {} as EntityDefinition,
//   loading: ref(true),
//   totalCount: ref(0),
//   itemsLoaded: ref(0),
//   currentCount: ref(0),
//   filteredListFields: [] as string[],
//   listOptions: reactive({
//     filter: {} as Record<string, string>,
//     orderBy: '',
//     order: 'asc' as 'asc' | 'desc',
//     limit: 50,
//     offset: 0
//   })
// }

let filteredListFields: string[] = []
const emit = defineEmits<{
  select: [id: string]
}>()

// async function loadList() {
//   const list = await easyApi.getList(props.entity, state.listOptions)
//   entityList.value = list.data
//   state.totalCount.value = list.totalCount
//   state.currentCount.value = list.rowCount
//   state.itemsLoaded.value = list.rowCount
// }


onBeforeMount(async () => {

  const entity = entityStore.entities.find(e => e.entityId === props.entity)

  if (!entity) {
    return
  }
  entityDef.value = entity
  loader.entity = entity

  filteredListFields = entity.listFields.filter(f => !['id', 'createdAt', 'updatedAt', entity.config.titleField].includes(f))
  // await loader.init(entity)
  // await loadList()
})


listenForKeyPress((e) => {
  if (e.key === 'n') {
    e.preventDefault()
    openNewEntityModal()
  }
})
listenForEntity(props.entity, 'list', async (data: EntityRecord) => {
  let inList = false
  loader.entityList.value.forEach((e, i) => {
    if (e.id === data.id) {
      inList = true
      loader.entityList.value[i] = data
    }
  })
  // await loadList()
})


// async function loadMore(lastItemToLoad: number) {
//   const list = await easyApi.getList(props.entity, {
//     ...state.listOptions,
//     offset: lastItemToLoad
//   })
//   state.itemsLoaded.value += list.rowCount
//   entityList.value.push(...list.data)
// }

// infinite scroll stuff
const infinite = useTemplateRef<HTMLElement>('infinite')

const rowGap = 3
const rowGapPx = `${rowGap}px`
const listHeight = ref<string>('0')
const itemHeightBase = 60
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
  await loader.loadList()
  parentEl.scrollTop = 0
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
