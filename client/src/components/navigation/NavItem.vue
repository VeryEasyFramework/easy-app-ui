<template>
  <RouterLink :to="to" class="nav-item">
    <ContainerPadded class="container">

      <MaterialIcon :icon="icon" class="icon"/>
      <div class="nav-label">{{ text }}</div>
    </ContainerPadded>
  </RouterLink>
</template>

<script setup lang="ts">

import Container from "@/components/layout/Container.vue";
import {MaterialIcons} from "@/components/icons/materialIcons";
import MaterialIcon from "@/components/icons/MaterialIcon.vue";
import ContainerPadded from "@/components/layout/ContainerPadded.vue";

const props = defineProps<{
  to: string
  icon: MaterialIcons
  text: string
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

  .container {

    height: max-content;
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr;
    align-items: center;
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
