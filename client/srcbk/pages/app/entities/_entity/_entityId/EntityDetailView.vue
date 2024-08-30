<template>
  <Grid :rows="['max-content','1fr']">
    <Grid :columns="['max-content','1fr','max-content','max-content']" class="overflow-visible">

      <WidgetCard flat full class="align-items-center overflow-visible z-max" bg-color="bg-bright">

      </WidgetCard>
      <WidgetCard flat full bg-color="bg-bright">
        <Grid align="center" justify="center">

          <TextLabel size="1.1" color="primary">
            {{ entityRecord.id }}
          </TextLabel>
        </Grid>
      </WidgetCard>

      <WidgetCard no-padding bg-color="bg-bright" class="border none"
                  full-width></WidgetCard>
      <Grid col justify="space-around" align="center" fit class="me-2">

        <ButtonIcon
            icon="save"
            size="2.5"
            color="success"
            @clicked="handleSave"/>
        <ButtonIcon
            size="2.5"
            icon="delete"
            color="error"
            @clicked="showDeleteDialog = true"/>
      </Grid>
    </Grid>
    <WidgetCard full>
      <EasyInput v-for="field in entityDef?.fields" :field="field" :get-list="api.call"
                 v-model="entityRecord[field.key]" :key="field.key"/>

    </WidgetCard>

    <ModalWrapper fit v-model="showDeleteDialog">
      <ConfirmationDialog
          v-model="showDeleteDialog"
          @confirmed="handleDelete"
          :title="`Delete ${entityRecord.id}`"
          message="Are you sure you want to delete this record type?"/>
    </ModalWrapper>
  </Grid>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";

import {useRoute, useRouter} from "vue-router";
import {
  Entity,
  EntityDefinition,
  ModalWrapper,
  EasyInput,
  ConfirmationDialog,
  TextLabel,
  ButtonIcon
} from "@eveffer/easy-client";
import {api} from "@/api/index";
import {useAppStore} from "@/stores/index";

const showDeleteDialog = ref(false);
const route = useRoute();
const entity = ref("");
const entityRecordId = ref("");
const props = defineProps<{}>();
const entityRecord = ref<Entity>({} as Entity);
const entityDef = ref<EntityDefinition>({} as EntityDefinition);
const actionResult = ref("");
const router = useRouter();
// const handleAction = async (actionId: string, data: Record<string, any>) => {
//   const response = await api.call("entity", "action", {
//     recordId: recordId.value,
//     modelId: modelId.value,
//     actionId: actionId,
//     params: data
//   });
//   actionResult.value = response;
// };
const appStore = useAppStore();
onMounted(async () => {
  entity.value = route.params.entity as string;
  entityDef.value = appStore.entities.find(e => e.entityId === entity.value) as EntityDefinition;
  entityRecordId.value = route.params.entityId as string;
  entityRecord.value = await api.call("entity", "getEntity", {
    entity: entity.value,
    id: entityRecordId.value
  });
});
const handleSave = async () => {
  await api.call("entity", "updateEntity", {
    entity: entity.value,
    id: entityRecord.value.id,
    data: entityRecord.value
  });
};
const handleDelete = async () => {
  await api.call("entity", "delete", {
    entity: entity.value,
    id: entityRecord.value.id
  });
  await router.push("/entities/" + entity.value);

};
</script>

<style scoped lang="scss">
.code {
  background-color: #1e1e1e;
  font-family: monospace;
  border-radius: var(--border-radius);
  color: white;
}
</style>
