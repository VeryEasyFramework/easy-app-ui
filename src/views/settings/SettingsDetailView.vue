<template>
  <Container v-if="loaded" class="settings-view">
    <Container class="title-area">
      <div class="title-4">
        {{ def.config.label }}
      </div>
    </Container>
    <Container class="row shrink fields-area">

      <EntityFieldGroup edit v-for="group in fieldGroups" :group="group" :record="record"
                        :key="group.key"/>
    </Container>
    <Container class="row shrink actions-area">
      <RecordAttendance :users="roomUsers"/>
      <EntityActions :entity-def="def" :record="record" type="settings"/>
    </Container>
  </Container>
</template>

<script setup lang="ts">

import Container from "@/components/layout/Container.vue";
import { computed, onBeforeMount, ref } from "vue";
import { settingsStore } from "@/stores/settingsStore.ts";
import type { SettingsEntityDefinition, SettingsRecord, User } from "@vef/types/mod.ts";
import EntityFieldGroup from "@/components/entities/entityRecord/EntityFieldGroup.vue";
import { easyApi } from "@/api/index.ts";
import EntityActions from "@/components/entities/entityRecord/EntityActions.vue";
import { joinSettings } from "@/realtime/index.ts";
import RecordAttendance from "@/components/realtime/RecordAttendance.vue";
import { listenForKeyPress, onControlS } from "@/utils/keyboard.ts";

const props = defineProps<{
  id: string
}>()
const record = ref<SettingsRecord>({})
const def = computed<SettingsEntityDefinition>(() => {
  return settingsStore.settings.find(s => s.settingsId === props.id)!
})

const fieldGroups = computed(() => {
  return def.value.fieldGroups.filter(g => g.fields.length > 0)
})
const loaded = ref(false)
onBeforeMount(async () => {
  loaded.value = false
  record.value = await easyApi.call("settings", "getSettingsRecord", {
    settingsId: props.id
  })
  loaded.value = true
})

listenForKeyPress((event) => {
  onControlS(event, async () => {
    event.preventDefault()
    await easyApi.call("settings", "updateSettings", {
      settingsId: props.id,
      data: record.value
    })
  })
})

joinSettings(props.id, (event, data) => {
  switch (event) {
    case "update":
      record.value = data
      break
    case "join":
      handleUserAttendance("join", data)
      break
    case "leave":
      handleUserAttendance("leave", data)
      break
  }
})
const roomUsers = ref<User[]>([])

function handleUserAttendance(event: "join" | "leave", data: any) {
  const user = data.user as User
  const users = data.users as User[]

  roomUsers.value = users

  const action = event === 'join' ? 'joined' : 'left'
  // notify({
  //   message: `${user.firstName} ${action} the record`,
  //   title: `User ${action}`,
  //   type: event === 'join' ? 'success' : 'warning'
  // })
}
</script>

<style lang="scss">
.settings-view {
  grid-template-areas:
  "title title"
  "fields actions";

  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr;

  .title-area {
    grid-area: title;
  }

  .fields-area {
    grid-area: fields;
  }

  .actions-area {
    grid-area: actions;
  }
}
</style>
