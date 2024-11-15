<template>
  <Container class="edit-log row shrink gap-3  position-relative">
    <div class="title-5">Edit Log</div>
    <ContainerPadded class="edit-log-container row shrink gap-3">
      <Container class="edit-log-entry  col shrink text-small" v-for="entry in editLog"
                 :key="entry.id">
        <div class="time italic">
          {{
            getPrettyDate(entry.createdAt, {
              format: "pretty"
            })
          }}
        </div>
        <RouterLink class="user-link" :to="`/entry/user/${entry.user}`">

          {{ entry.userFullName }}
        </RouterLink>
        <div :class="entry.action">
          {{ actionMap[entry.action] }}
        </div>
        <div>
          {{ entry.entryTitle || entry.entryId }}
        </div>
        <MaterialIcon class="cursor-pointer" icon="info" @click="currentLog=entry;showLog=true"/>

      </Container>

    </ContainerPadded>
    <Container v-if="currentLog && showLog"
               class="position-absolute w-100 h-100 top left row shrink ">
      <MaterialIcon class="cursor-pointer horizontal-align-self-end" icon="close"
                    @click="showLog=false"/>
      <DisplayJSON :value="currentLog?.editData"/>
    </Container>
  </Container>
</template>

<script setup lang="ts">

import { EditLog } from "@vef/types/mod.ts";
import Container from "@/components/layout/Container.vue";
import { getPrettyDate } from "@/utils/index.ts";
import ContainerPadded from "@/components/layout/ContainerPadded.vue";
import DisplayJSON from "@/components/displayFields/DisplayJSON.vue";
import { ref } from "vue";
import MaterialIcon from "@/components/icons/MaterialIcon.vue";

const actionMap = {
  'create': 'created',
  'update': 'updated',
  'delete': 'deleted'
}
const props = defineProps<{
  editLog: EditLog[]
}>()
const currentLog = ref<EditLog>()
const showLog = ref(false)
</script>

<style lang="scss">
.edit-log {
  grid-template-rows: max-content 1fr;

  .edit-log-container {
    position: relative;
    padding-inline-start: 1rem;

    &:before {
      border-inline-start: 0.1rem solid var(--color-primary-brighter);
      content: '';
      height: 100%;
      position: absolute;
      top: 0;
      left: 0.5rem;

    }
  }

  .edit-log-entry {
    position: relative;
    overflow: visible;

    &:after {
      content: '';
      width: 0.5rem;
      height: 0.5rem;

      position: absolute;
      top: 0.25rem;
      left: -0.7rem;
      border-radius: 50%;
      background-color: var(--color-primary);

    }
  }

  .time {

  }

  .create {
    color: var(--color-success-darker);
  }

  .update {
    color: var(--color-warning-darker);
  }

  .delete {
    background-color: var(--color-error);
  }

  a {
    &.user-link {
      color: var(--color-text);
      //text-decoration: none;
      font-weight: bold;
    }
  }
}

</style>
