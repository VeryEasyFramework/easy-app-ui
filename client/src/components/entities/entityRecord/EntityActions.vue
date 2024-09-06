<template>
  <ContainerPadded class="row shrink">
    <div>
      <div class="title-4">Actions</div>
    </div>
    <Container class="row shrink">

      <CardWidget v-for="action in actions"
                  :key="action.key">

        <Container class="col-2 shrink vertical-align-center">
          <ButtonIcon icon="play_arrow" color="secondary" @click="handleAction(action)"
                      :label="action.label"/>
          <Container>
            <div class="title-5 text-accent">{{ action.label }}</div>
            <div class="text-small italic">{{ action.description }}</div>
          </Container>
        </Container>
      </CardWidget>

    </Container>
  </ContainerPadded>
</template>

<script setup lang="ts">

import Container from "@/components/layout/Container.vue";
import type {EntityRecord, EntityAction, EntityDefinition} from "@/types/index.ts";
import {onMounted, ref} from "vue";
import Button from "@/components/buttons/Button.vue";
import ButtonIcon from "@/components/buttons/ButtonIcon.vue";
import CardWidget from "@/components/widgets/CardWidget.vue";
import ContainerPadded from "@/components/layout/ContainerPadded.vue";
import {easyApi} from "@/api/index.ts";
import {notify} from "@/notify/index.ts";

const props = defineProps<{
  entityDef: EntityDefinition
  record: EntityRecord
}>()

const actions = ref<EntityAction[]>([])

onMounted(() => {
  actions.value = props.entityDef.actions
})

async function handleAction(action: EntityAction) {
  const response = await easyApi.runEntityAction(props.entityDef.entityId, props.record.id, action.key, {})
  notify({
    title: `Action ${action.label || action.key} completed`,
    message: response,
    type: 'success'
  })
}
</script>

<style scoped>

</style>
