<template>
  <ListDetailLayout max="300px">
    <template #list>
      <Grid :columns="['max-content','1fr','max-content']">
        <WidgetContainer bg-color="bg-darker" no-padding class="border none"/>

        <WidgetContainer bg-color="bg-dark" no-padding full class="overflow-visible z-max">

          <Grid :rows="['max-content','1fr']">
            <WidgetCard full flat>

              <ButtonIcon icon="add" @clicked="showNewEntityModal=true"/>
            </WidgetCard>

            <WidgetCard full flat no-bg class="overflow-visible">
              <Grid row fit class="overflow-x-visible">
                <TransitionGridList>


                  <WidgetListItem flat activeColor="secondary-bright" hoverColor="primary-bright"
                                  class="overflow-x-visible"
                                  :active="$route.params.entity==entityRecord.id"
                                  v-for="(entityRecord) in entities"
                                  :key="entityRecord.id"
                                  @clicked="$router.push(`/app/entities/${entity}/${entityRecord.id}`)">
                    <Grid col fit>
                      <div v-for="field in listFields" :key="field">
                        <TextLabel size="0.5" color="primary-dark">{{ field.label }}</TextLabel>
                        <TextBase small>{{ entityRecord[field.key] }}</TextBase>
                      </div>
                    </Grid>
                  </WidgetListItem>
                </TransitionGridList>
              </Grid>
            </WidgetCard>
          </Grid>
        </WidgetContainer>
        <WidgetContainer bg-color="bg-darker" no-padding class="border none"/>
      </Grid>
    </template>
    <template #detail>
      <WidgetContainer bg-color="bg-dark" full>

        <TransitionRouterView :transition-key="$route.params.entityId as string"/>
      </WidgetContainer>
    </template>
    <template #modal-area>
      <ModalWrapper v-model="showNewEntityModal">
        <WidgetCard>
          <FormWrapper @submit="createEntity">

            <EasyInput v-for="field in requiredFields" :field="field" :getList="api.call"
                       v-model="newEntity[field.key]" :key="field.key"/>
          </FormWrapper>
        </WidgetCard>
      </ModalWrapper>
    </template>
  </ListDetailLayout>
</template>

<script setup lang="ts">


import {computed, onBeforeUnmount, onMounted, ref} from "vue";
import {useRoute} from "vue-router";


import {
  TransitionGridList,
  Entity,
  EntityDefinition,
  staggerAdd,
  WidgetContainer,
  ModalWrapper,
  ListDetailLayout,
  WidgetListItem,
  ButtonIcon,
  FormWrapper,
  TextLabel, TextBase,
  EasyInput, EasyField
} from "@eveffer/easy-client";

import {api, realtimeClient} from "@/api/index";

import {useAppStore} from "@/stores/index";

const appStore = useAppStore();
const entities = ref<Entity[]>([]);
const props = defineProps<{}>();
const route = useRoute();
const entityDef = ref<EntityDefinition>();
const newEntity = ref<Entity>({} as Entity);
const showNewEntityModal = ref(false);
const entity = ref("");

async function createEntity() {
  await api.call("entity", "createEntity", {
    entity: entity.value,
    data: newEntity.value
  });
  showNewEntityModal.value = false;
}

const requiredFields = computed(() => {
  return entityDef.value?.fields.filter((f) => f.required);
});

const listFields = computed(() => {
  const fields: EasyField[] = [];
  const listFields = entityDef.value?.fields.filter((f) => f.inList);
  if (listFields) {
    fields.push(...listFields);
  }

  return fields;
});

function realtimeListener(room: string, event: string, data: Record<string, any>) {
  if (room !== "entity") {
    return;
  }
  switch (event) {
    case "update":
      onUpdateEntity(data);
      break;
    case "delete":
      onDeleteEntity(data);
      break;
    case "create":
      onCreateEntity(data);
      break;

  }
}

function onUpdateEntity(data: any) {

  if (data.entity !== entity.value) {
    return;
  }
  const entityRecord = data.data;
  const index = entities.value.findIndex((r) => r.id === entityRecord.id);
  if (index === -1) {
    const index = entities.value.findIndex((r) => r.label > entityRecord.label);
    if (index === -1) {
      entities.value.push(entityRecord);
    } else {
      entities.value.splice(index, 0, entityRecord);
    }
  } else {
    entities.value.splice(index, 1, entityRecord);
  }
}

function onDeleteEntity(data: any) {
  if (data.entity !== entity.value) {
    return;
  }
  const id = data.id;
  const index = entities.value.findIndex((r) => r.id === id);
  if (index !== -1) {
    entities.value.splice(index, 1);
  }
}

function onCreateEntity(data: any) {
  if (data.entity !== entity.value) {
    return;
  }
  const entityRecord = data.data;
  const index = entities.value.findIndex((r) => r.label > entityRecord.label);
  if (index === -1) {
    entities.value.push(entityRecord);
  } else {
    entities.value.splice(index, 0, entityRecord);
  }
}

const listColumns = ref<string[]>([]);
onMounted(async () => {
  realtimeClient.onMessage(realtimeListener);
  realtimeClient.join("entity", "update");
  realtimeClient.join("entity", "delete");
  realtimeClient.join("entity", "create");

  entity.value = route.params.entity as string;

  entityDef.value = appStore.entities.find((entityDef) => entityDef.entityId === entity.value);
  if (!entityDef.value) {
    return;
  }
  for (const field of entityDef.value?.fields) {
    newEntity.value[field.key] = field.label;
  }
  const apiEntities: {
    data: Entity[],
    columns: string[],
    rowCount: number
  } = await api.call("entity", "getList", {
    entity: route.params.entity as string
  });
  listColumns.value = apiEntities.columns;
  staggerAdd(apiEntities.data, entities.value);

});

onBeforeUnmount(() => {
  realtimeClient.leave("entity");
  realtimeClient.removeMessageListener(realtimeListener);

});


</script>

<style scoped lang="scss">

</style>
