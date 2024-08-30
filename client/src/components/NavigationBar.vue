<template>
  <Container class="auto-flow-columns column-gap-4">
    <NavigationItem icon="settings" label="Entities" link="/entity"/>
    <NavigationItem icon="code" label="API Explorer" link="api-explorer"/>
    <NavigationItem label="Realtime Explorer" icon="network_ping" link="realtime"/>
  </Container>
</template>

<script setup lang="ts">

import NavigationItem from "@/components/NavigationItem.vue";
import Container from "@/components/layout/Container.vue";



const devItem = [
  {label: "Entity", link: "/entity"},
]
</script>

<style scoped>

</style>
