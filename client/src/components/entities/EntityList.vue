<template>
  <Container>
<div>
  {{state.entityDef}}
</div>
  </Container>
</template>

<script setup lang="ts">
import Container from "@/components/layout/Container.vue";
import {entityStore} from "@/stores/entityStore.ts";
import {EntityDefinition} from "@/types/index.ts";
import {onBeforeMount} from "vue";

const props = defineProps<{
  entity: string
}>()

const state = {
  entityDef:{} as EntityDefinition
}

onBeforeMount(() => {
  const entity = entityStore.entities.find(e => e.entityId === props.entity)

  if (!entity) {
    return
  }
  state.entityDef = entity
})
</script>

<style scoped>

</style>
