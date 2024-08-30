<template>
  <Container>
    <Container class="navigator-side">
      <HeaderBrand class="brand"/>
      <Container class="nav row fit">
        <NavItem icon="person" to="/entity" text="Entities">
          Entities
        </NavItem>
        <NavItem icon="code" to="/api-explorer" text="API Explorer">
          API Explorer
        </NavItem>
        <NavItem icon="network_ping" to="/realtime" text="Realtime Explorer">
          Realtime Explorer
        </NavItem>
      </Container>
      <Container class="bottom">

      </Container>
    </Container>

  </Container>
</template>

<script setup lang="ts">

import Container from "@/components/layout/Container.vue";
import CardWidget from "@/components/CardWidget.vue";
import HeaderBrand from "@/components/HeaderBrand.vue";
import MaterialIcon from "@/components/icons/MaterialIcon.vue";
import NavItem from "@/components/navigation/NavItem.vue";
</script>

<style>

.navigator-side {
  grid-template-areas: "brand"
                       "nav"
                       "bottom";
  grid-template-columns: 1fr;
  grid-template-rows: 1fr max-content 1fr;
  justify-items: center;

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
