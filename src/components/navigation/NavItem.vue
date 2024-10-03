<template>
  <RouterLink :to="to" class="nav-item px-1">
    <ContainerPadded class="col shrink horizontal-align-between">

      <div v-if="!collapse" class="nav-label pe-3">{{ text }}</div>
      <div>

        <MaterialIcon :icon="icon" class="icon"/>
      </div>
    </ContainerPadded>
  </RouterLink>
</template>

<script setup lang="ts">

import {MaterialIcons} from "@/components/icons/materialIcons";
import MaterialIcon from "@/components/icons/MaterialIcon.vue";
import ContainerPadded from "@/components/layout/ContainerPadded.vue";

const props = defineProps<{
  to: string
  icon: MaterialIcons
  text: string
  collapse?: boolean
}>()
</script>

<style>


.nav-item {
  border-radius: var(--border-radius);
  transition: all var(--snap-ease);

  &:hover {
    background-color: var(--color1-900);
    color: var(--color-white);

    .nav-label, .icon {
      color: var(--color-white);
    }
  }


  a {
    text-decoration: none;
  }

  .icon {
    font-weight: bold;
    color: var(--color-text);

  }

  &.router-link-active {
    background-color: var(--color-primary);

    .nav-label, .icon {
      color: var(--color-white);
    }
  }


  .nav-label {
    color: var(--color-text);
    transition: color var(--snap-ease);
    font-size: 0.8rem;
  }

}

</style>
