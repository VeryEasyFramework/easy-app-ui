<template>
  <ContainerPadded class="entry-list-wrapper">
    <div class="title-3">
      {{ entryType?.config.label }}
    </div>
    <CardWidget>

      <Container class="list-header col horizontal-align-between">
        <EntrySearchInput v-if="loader.initialized" :entryType="entryType" @search="handleSearch"/>

        <div>

          <ButtonIcon :label="`New ${entryType?.config?.label}`" @click="openNewEntryModal"
                      icon="add" size="1"/>
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

          <EntryListItem v-for="entry in loader.entryList.value"
                         :active="$route.params.id==entry.id"
                         :key="entry.id"
                         :entry-type="entryType!"
                         :fields="filteredListFields"
                         :entry="entry" @select="(value)=>$emit('select',value)"/>
        </TransitionList>

      </div>
    </div>
    <ModalView v-model="showNewEntryModal">
      <NewEntryForm :entry-type="loader.entryType" @close="closeNewEntryModal"/>
    </ModalView>
  </ContainerPadded>
</template>

<script setup lang="ts">
import Container from "@/components/layout/Container.vue";
import { entryTypeStore } from "@/stores/entryTypeStore.ts";
import type { AdvancedFilter, EasyField, EntryType } from "@vef/types/mod.ts";
import { onBeforeMount, onBeforeUnmount, onMounted, ref, useTemplateRef } from "vue";

import ButtonIcon from "@/components/buttons/ButtonIcon.vue";
import CardWidget from "@/components/widgets/CardWidget.vue";
import ModalView from "@/components/modal/ModalView.vue";

import ContainerPadded from "@/components/layout/ContainerPadded.vue";
import { listenForList } from "@/realtime/index.ts";
import { EntryListLoader } from "@/components/entries/listLoader.ts";
import TransitionList from "@/components/transitions/TransitionList.vue";

import EntryListItem from "@/views/entry/EntryListItem.vue";
import EntrySearchInput from "@/components/entries/EntrySearchInput.vue";
import NewEntryForm from "@/components/entries/NewEntryForm.vue";

const loader = new EntryListLoader()
const props = defineProps<{
  entryType: string,
}>()
const entryType = ref<EntryType>()

function openNewEntryModal() {
  showNewEntryModal.value = true
}

function closeNewEntryModal() {
  showNewEntryModal.value = false
}

function handleSearch(filter: Record<string, AdvancedFilter>) {
  loader.listOptions.orFilter = filter
  loader.loadList()

}

const showNewEntryModal = ref(false)


let filteredListFields: EasyField[] = []
const emit = defineEmits<{
  select: [id: string]
}>()


onBeforeMount(async () => {

  const entryTypeDef = entryTypeStore.get(props.entryType)
  if (!entryTypeDef) {
    return
  }
  entryType.value = entryTypeDef
  loader.entryType = entryTypeDef
  const connectionTitleFields = entryTypeDef.fields.filter(f => f.connectionTitleField).map(f => f.connectionTitleField)
  filteredListFields = entryTypeDef.fields.filter(f => {
    if (!entryTypeDef.listFields.includes(f.key)) {
      return false
    }
    if (['id', 'createdAt', 'updatedAt', entryTypeDef.config.titleField].includes(f.key)) {
      return false
    }
    return !connectionTitleFields.includes(f.key)
  })

})
listenForList(props.entryType, async (action, record) => {
  switch (action) {
    case 'create':
      await handleResize()
      break
    case 'update':
      let inList = false
      loader.entryList.value.forEach((e, i) => {
        if (e.id === record.id) {
          inList = true
          loader.entryList.value[i] = record
        }
      })
      if (!inList) {
        await handleResize()
      }
      break
    case 'delete':
      loader.entryList.value = loader.entryList.value.filter(e => e.id !== record.id)
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
  await loader.init(entryType.value as EntryType)
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
.entry-list-wrapper {
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
