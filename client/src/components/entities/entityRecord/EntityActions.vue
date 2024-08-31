<template>
  <Container>
    <div>
      actions
      {{ props.entityDef.actions }}

    </div>
  </Container>
</template>

<script setup lang="ts">

import Container from "@/components/layout/Container.vue";
import {Entity, EntityDefinition} from "@/types/index.ts";

const props = defineProps<{
  entityDef: EntityDefinition
  record: Entity
}>()
</script>

<style scoped>

</style>
