<template>
  <ListDetailLayout max-width="200px">
    <template #list>

      <Container class="row shrink">
        <RouterLink :to="`/settings/${settingsDef.settingsId}`"
                    v-for="settingsDef in settingsStore.settings"
                    :key="settingsDef.settingsId">

          <ContainerPadded class="card"
                           :key="settingsDef.settingsId">
            {{ settingsDef.config.label }}
          </ContainerPadded>
        </RouterLink>
      </Container>

    </template>
    <template #detail>
      <TransitionRouterView :key="$route.params.id as string"/>
    </template>
  </ListDetailLayout>
</template>

<script setup lang="ts">

import Container from "@/components/layout/Container.vue";
import { settingsStore } from "@/stores/settingsStore.ts";
import ContainerPadded from "@/components/layout/ContainerPadded.vue";
import ListDetailLayout from "@/components/layout/ListDetailLayout.vue";
import TransitionRouterView from "@/components/transitions/TransitionRouterView.vue";
</script>

<style scoped lang="scss">

</style>
