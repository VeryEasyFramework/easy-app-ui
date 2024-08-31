<template>
  <Container>
    <Container class="col">
      <div class="label">Created At:</div>
      <DisplayTimestamp class="label text-info-dark" :value="record.createdAt"/>
    </Container>
    <Container class="col">
      <div class="label">Last Updated:</div>
      <DisplayTimestamp class="label text-info-dark" :value="record.updatedAt"/>
    </Container>
  </Container>
</template>

<script setup lang="ts">
import {Entity, EntityDefinition} from "@/types/index.ts";
import Container from "@/components/layout/Container.vue";
import DisplayTimestamp from "@/components/displayFields/DisplayTimestamp.vue";

const props = defineProps<{
  entityDef: EntityDefinition
  record: Entity
}>()
</script>

<style scoped>

</style>
