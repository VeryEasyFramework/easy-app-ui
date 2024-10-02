<template>
<Container class="edit-log row shrink gap-3">
  <div class="title-5">Edit Log</div>
  <ContainerPadded class="edit-log-container row shrink gap-3">
    <Container class="edit-log-entry  col shrink text-small" v-for="entry in editLog" :key="entry.id">
      <div class="time italic">
        {{getPrettyDate(entry.createdAt,{
        format:"pretty"
      })}}
      </div>
     <RouterLink class="user-link" :to="`/entity/user/${entry.user}`">

      {{entry.userFullName}}
     </RouterLink>
      <div  :class="entry.action">
       {{ actionMap[entry.action] }}
      </div>
      <div>
        {{entry.entityTitle}}
      </div>

    </Container>
  </ContainerPadded>
</Container>
</template>

<script setup lang="ts">

import {EditLog} from "@/api/apiTypes.ts";
import Container from "@/components/layout/Container.vue";
import {getPrettyDate} from "@/utils/index.ts";
import ContainerPadded from "@/components/layout/ContainerPadded.vue";
const actionMap = {
  'create':'created',
  'update':'updated',
  'delete':'deleted'
}
const props = defineProps<{
  editLog:EditLog[]
}>()

</script>

<style lang="scss">
.edit-log{
  .edit-log-container{
    position: relative;
    overflow:visible;
    padding-inline-start: 1rem;
    &:before{
    border-inline-start: 0.1rem solid var(--color-primary-brighter);
    content: '';
      height: 100%;
    position: absolute;
    top: 0;
    left: 0.5rem;

    }
  }
  .edit-log-entry{
    position: relative;
    overflow: visible;
    &:after{
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
  .time{

  }
  .create{
    color: var(--color-success-darker);
  }
  .update{
    color: var(--color-warning-darker);
  }
  .delete{
    background-color: var(--color-error);
  }
  a{
    &.user-link{
      color: var(--color-text);
      //text-decoration: none;
      font-weight: bold;
    }
  }
}

</style>
