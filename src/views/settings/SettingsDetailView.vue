<template>
  <Container v-if="loaded" class="settings-view">
    <Container class="title-area">
      <div class="title-4">
        {{ def.config.label }}
      </div>
    </Container>
    <Container class="row shrink fields-area">

      <EntryFieldGroup edit v-for="group in fieldGroups" :group="group" :entry="settings"
                       :key="group.key"/>
    </Container>
    <Container class="row shrink actions-area">
      <RecordAttendance :users="roomUsers"/>
      <EntryActions :entry-type="def" :entry="settings" type="settings"/>
    </Container>
  </Container>
</template>

<script setup lang="ts">

import Container from "@/components/layout/Container.vue";
import { computed, onBeforeMount, ref } from "vue";
import { settingsTypeStore } from "@/stores/settingsTypeStore.ts";
import type { Settings, SettingsType, User } from "@vef/types/mod.ts";
import { easyApi } from "@/api/index.ts";
import { joinSettings } from "@/realtime/index.ts";
import RecordAttendance from "@/components/realtime/RecordAttendance.vue";
import { listenForKeyPress, onControlS } from "@/utils/keyboard.ts";
import EntryFieldGroup from "@/components/entries/entry/EntryFieldGroup.vue";
import EntryActions from "@/components/entries/entry/EntryActions.vue";

const props = defineProps<{
  settingsType: string
}>()

const settings = ref<Settings>({})
const def = computed<SettingsType>(() => {
  return settingsTypeStore.get(props.settingsType)!
})

const fieldGroups = computed(() => {
  return def.value.fieldGroups.filter(g => g.fields.length > 0)
})
const loaded = ref(false)
onBeforeMount(async () => {
  loaded.value = false
  settings.value = await easyApi.call("settings", "getSettings", {
    settingsType: props.settingsType
  })
  loaded.value = true
})

listenForKeyPress((event) => {
  onControlS(event, async () => {
    event.preventDefault()
    await easyApi.call("settings", "updateSettings", {
      settingsType: props.settingsType,
      data: settings.value
    })
  })
})

joinSettings(props.settingsType, (event, data) => {
  switch (event) {
    case "update":
      settings.value = data
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
