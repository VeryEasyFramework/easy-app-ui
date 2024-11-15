<template>
  <Container>
    <Container class="col">
      <div class="label">Created At:</div>
      <DisplayTimestamp class="label text-info-dark" :value="entry.createdAt"/>
    </Container>
    <Container class="col">
      <div class="label">Last Updated:</div>
      <DisplayTimestamp class="label text-info-dark" :value="entry.updatedAt"/>
    </Container>
  </Container>
</template>

<script setup lang="ts">
import Container from "@/components/layout/Container.vue";
import DisplayTimestamp from "@/components/displayFields/DisplayTimestamp.vue";
import { Entry, EntryType } from "@vef/types/mod.ts";

const props = defineProps<{
  entryType: EntryType
  entry: Entry
}>()
</script>

<style scoped>

</style>
