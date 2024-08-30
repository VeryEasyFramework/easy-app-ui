<template>
  <div class="nav-wrapper position-relative">

    <div class="grid auto-flow-columns nav-item pointer center-items">
      <MaterialIcon :icon="icon"/>
      <RouterLink  v-if="link" :to="link">
        <div class="nav-label">{{ label }}</div>
      </RouterLink>
      <div v-if="links" class="nav-label">{{ label }}</div>
      <MaterialIcon v-if="links" class="nav-arrow" icon="keyboard_arrow_down"/>
    </div>
    <div v-if="links" class="position-relative">
      <div class="nav-list pt-3">

        <CardWidget>
          <ContainerPadded class="row-gap-3">

            <NavListItem v-for="link in links" :label="link.label" :link="link.link"
                         :key="link.label"/>
          </ContainerPadded>
        </CardWidget>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import MaterialIcon from "@/components/icons/MaterialIcon.vue";
import type {MaterialIcons} from "@/components/icons/materialIcons.ts";
import CardWidget from "@/components/CardWidget.vue";
import NavListItem from "@/components/NavListItem.vue";
import Container from "@/components/layout/Container.vue";
import ContainerPadded from "@/components/layout/ContainerPadded.vue";

defineProps<{
  label: string
  icon: MaterialIcons
  link?: string
  links?: {
    label: string
    link: string
  }[]
}>()


</script>

<style lang="scss">
.nav-item {
  transition: all var(--snap-ease);
  a{
    text-decoration: none;
  }
  .nav-arrow {
    rotate: -90deg;
    transform: translate(0, 0);
    transition: all var(--snap-ease);
  }
  .router-link-active {
    .nav-label {
      color: var(--color-primary);
      font-weight: bold;
    }
  }
  .nav-label {
    color: var(--color-text);
    transition: color var(--snap-ease);
  }


  &:hover {
    .nav-label {
      color: var(--color-primary);
    }

    .nav-arrow {
      rotate: 0deg;
      transform: translate(0, 0.1rem);
    }
  }
}

.nav-wrapper {
  position: relative;

  .nav-list {
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    min-width: fit-content;
    width: max-content;

    transition: all var(--snap-ease);
  }

  &:hover {
    .nav-list {
      opacity: 1;
      pointer-events: all;
    }
  }
}
</style>
