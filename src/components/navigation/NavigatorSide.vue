<template>
  <ContainerPadded class="vh-100 navigator-side shadow-small">
    <Container class="brand" :class="{
      col: !collapse,
      'horizontal-align-center': collapse,
    }">


      <HeaderBrand :collapse="collapse"/>
      <MaterialIcon :icon="collapse? 'left_panel_open':'left_panel_close'"
                    @click="collapse=!collapse" class="flat"/>
    </Container>
    <Container class="nav row shrink">
      <NavItem :collapse="collapse" icon="person" to="/entity" text="Entities"/>
      <NavItem :collapse="collapse" icon="settings" to="/settings" text="Settings"/>
      <NavItem :collapse="collapse" icon="code" to="/api-explorer" text="API Explorer"/>
      <NavItem :collapse="collapse" icon="network_ping" to="/realtime" text="Realtime Explorer"/>
    </Container>
    <Container class="bottom">
      <Container class="col shrink horizontal-align-between">

        <ThemeSwitcher/>
        <ButtonIcon color="error" class="flat" icon="logout" label="Logout"
                    @click="appStore.logout"/>
      </Container>
    </Container>
  </ContainerPadded>

</template>

<script setup lang="ts">

import Container from "@/components/layout/Container.vue";
import HeaderBrand from "@/components/HeaderBrand.vue";
import MaterialIcon from "@/components/icons/MaterialIcon.vue";
import NavItem from "@/components/navigation/NavItem.vue";
import ContainerPadded from "@/components/layout/ContainerPadded.vue";
import ThemeSwitcher from "@/components/buttons/ThemeSwitcher.vue";
import { ref } from "vue";
import ButtonIcon from "@/components/buttons/ButtonIcon.vue";
import { useAppStore } from "@/stores/appStore.ts";

const collapse = ref(false)

const appStore = useAppStore()
</script>

<style>

.navigator-side {
  grid-template-areas: "brand"
                       "nav"
                       "bottom";
  grid-template-columns: 1fr;
  grid-template-rows: 1fr max-content 1fr;
  justify-items: center;
  background-color: var(--color-widget-bg);
  border-top-right-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);


  .brand {
    grid-area: brand;
    align-content: start;
  }

  .nav {
    grid-area: nav;

  }

  .bottom {
    grid-area: bottom;
    align-content: end;
  }

  a {
    text-decoration: none;
  }
}

</style>
