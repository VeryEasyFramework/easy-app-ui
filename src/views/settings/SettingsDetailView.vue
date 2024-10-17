<template>
  <Container v-if="loaded">
    <Container>
      <div class="title-4">
        {{ def.config.label }}
      </div>
    </Container>
    <Container>

      <EntityFieldGroup edit v-for="group in def.fieldGroups" :group="group" :record="record"/>
    </Container>
  </Container>
</template>

<script setup lang="ts">

import Container from "@/components/layout/Container.vue";
import { computed, onBeforeMount, ref } from "vue";
import { settingsStore } from "@/stores/settingsStore.ts";
import type { SettingsEntityDefinition, SettingsRecord } from "@vef/types/mod.ts";
import EntityFieldGroup from "@/components/entities/entityRecord/EntityFieldGroup.vue";
import { easyApi } from "@/api/index.ts";

const props = defineProps<{
  id: string
}>()
const record = ref<SettingsRecord>({})
const def = computed<SettingsEntityDefinition>(() => {
  return settingsStore.settings.find(s => s.settingsId === props.id)!
})
const loaded = ref(false)
onBeforeMount(async () => {
  loaded.value = false
  record.value = await easyApi.call("settings", "getSettingsRecord", {
    settingsId: props.id
  })
  loaded.value = true
})
</script>

<style scoped lang="scss">

</style>
