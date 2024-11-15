<template>
  <ListDetailLayout max-width="200px">
    <template #list>

      <Container class="row shrink">
        <RouterLink :to="`/settings/${settingsType.settingsType}`"
                    v-for="settingsType in settingsTypeStore.list()"
                    :key="settingsType.settingsType">

          <ContainerPadded class="card"
                           :key="settingsType.settingsType">
            {{ settingsType.config.label }}
          </ContainerPadded>
        </RouterLink>
      </Container>

    </template>
    <template #detail>
      <TransitionRouterView :key="$route.params.settingsType as string"/>
    </template>
  </ListDetailLayout>
</template>

<script setup lang="ts">

import Container from "@/components/layout/Container.vue";
import { settingsTypeStore } from "@/stores/settingsTypeStore.ts";
import ContainerPadded from "@/components/layout/ContainerPadded.vue";
import ListDetailLayout from "@/components/layout/ListDetailLayout.vue";
import TransitionRouterView from "@/components/transitions/TransitionRouterView.vue";
</script>

<style scoped lang="scss">

</style>
