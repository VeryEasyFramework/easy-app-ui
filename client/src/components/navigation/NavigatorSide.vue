<template>
  <ContainerPadded class="vh-100 navigator-side shadow-small">
    <HeaderBrand class="brand"/>
    <Container class="nav row shrink">
      <NavItem icon="person" to="/entity" text="Entities"/>
      <NavItem icon="code" to="/api-explorer" text="API Explorer"/>
      <NavItem icon="network_ping" to="/realtime" text="Realtime Explorer"/>
    </Container>
    <Container class="bottom">

    </Container>
  </ContainerPadded>

</template>

<script setup lang="ts">

import Container from "@/components/layout/Container.vue";
import CardWidget from "@/components/widgets/CardWidget.vue";
import HeaderBrand from "@/components/HeaderBrand.vue";
import MaterialIcon from "@/components/icons/MaterialIcon.vue";
import NavItem from "@/components/navigation/NavItem.vue";
import ContainerPadded from "@/components/layout/ContainerPadded.vue";
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
