<template>
  <ContainerPadded class="list-container">
    <Container>
      <Title>{{ entityLabel }}</Title>
    </Container>
    <Container :key="entity" class="table-container">
      <Container>
        <Container class="col">

          <Container class="row fit" v-for="field in listFields"
                     :key="field.key">
            <div class="text-center">
              {{ field.label }}
            </div>
            <Container class="search-filter align-items-center">

              <EasyInput no-label :field="field"
                         v-model="listOptions.filter[field.key]"></EasyInput>
              <Container class="row fit">

                <MaterialIcon class="pointer disable-select" @click="()=>{
                sort(field.key, 'asc')
              }" :class="{
                sort: listOptions.orderBy === field.key && listOptions.order === 'asc'
              }" icon="arrow_upward"></MaterialIcon>
                <MaterialIcon class="pointer disable-select"
                              :class="{
                sort: listOptions.orderBy === field.key && listOptions.order === 'desc'
                            }"
                              @click="()=>{
                sort(field.key, 'desc')
                            }"
                              icon="arrow_downward"></MaterialIcon>
              </Container>
            </Container>


          </Container>
        </Container>
      </Container>
      <Container class="row fit overflow-y-scroll">
        <CardWidget class="full-width" v-for="record in entityList"
                    :key="`${entity}${record.id}`">

          <Container class="col justify-content-between align-items-center"
          >
            <Container class="col fit justify-content-between"
                       v-for="field in listFields"

                       :key="`${entity}${record.id}${field.key}`">
              <div>

                {{ record[field.connectionTitleField || field.key] }}
              </div>
              <div class="border"></div>
            </Container>
          </Container>
        </CardWidget>
      </Container>

    </Container>

  </ContainerPadded>
</template>

<script setup lang="ts">
import {onBeforeMount, onBeforeUnmount, onMounted, reactive, ref} from "vue";
import {entityStore} from "@/stores/entityStore.ts";
import type {EasyField} from "@/types/easyField.ts";
import ContainerPadded from "@/components/layout/ContainerPadded.vue";
import Container from "@/components/layout/Container.vue";
import Title from "@/components/text/Title.vue";
import {Entity} from "@/types/index.ts";
import CardWidget from "@/components/CardWidget.vue";
import EasyInput from "@/components/inputs/EasyInput.vue";
import MaterialIcon from "@/components/icons/MaterialIcon.vue";
import {ListOptions} from "@/api/apiTypes.ts";
import {easyApi} from "@/api/index.ts";
import DisplayField from "@/components/displayFields/DisplayField.vue";
import {listenForKeyPress, onEnter} from "@/utils/keyboard.ts";

const props = defineProps<{
  entity: string
}>()
let fields: EasyField[] = []
let listFields: EasyField[] = []
let titleFields: Record<string, EasyField> = {}
let entityLabel = ''
const entityList = ref<Entity[]>([])

const listOptions = reactive({
  filter: {} as Record<string, string>,
  orderBy: '',
  order: 'asc' as 'asc' | 'desc',
  limit: 50,
  offset: 0
})

const listResults = reactive({
  data: [] as any[],
  rowCount: 0,
  columns: [] as string[]
})

async function sort(key: string, direction: 'asc' | 'desc' = 'asc') {
  listOptions.orderBy = key
  listOptions.order = direction
  await loadList()
}

async function loadList() {
  const list = await easyApi.getList(props.entity, {
    filter: listOptions.filter,
    orderBy: listOptions.orderBy,
    order: listOptions.order,
    limit: 100,
    offset: 0
  })
  entityList.value = list.data
  listResults.rowCount = list.rowCount
  listResults.columns = list.columns
}

listenForKeyPress((e) => {

  onEnter(e as KeyboardEvent, async () => {

    await loadList()
  })
})
onMounted(async () => {
  entityList.value = []
  await loadList()
});
onBeforeUnmount(() => {
  entityList.value = []
})
onBeforeMount(() => {
  console.log('EntityListView mounted')
  const entity = entityStore.entities.find(e => e.entityId === props.entity)

  if (!entity) {
    return
  }
  if (entity) {
    entityLabel = entity.label
    fields = entity.fields
    const titles = entity.fields.filter(f => f.connectionTitleField).map(f => f.connectionTitleField)
    const titleFieldList = entity.fields.filter(f => f.inList && titles.includes(f.key))
    titleFields = titleFieldList.reduce((acc, field) => {
      acc[field.key] = field
      return acc
    }, {} as Record<string, EasyField>)
    listFields = entity.fields.filter(f => f.inList && !titles.includes(f.key))
  }
})
</script>

<style scoped>
.sort {
  font-weight: bold;
  color: var(--color-success-darker);
}

.search-filter {
  grid-template-columns: minmax(max-content, 400px) max-content;

}

.table-container {
  grid-template-rows:  max-content 1fr;
}

.list-container {
  grid-template-rows:  max-content 1fr;
}

</style>
