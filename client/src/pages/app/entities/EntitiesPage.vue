<template>
  <Grid :columns="['max-content','1fr']" :rows="['1fr']">

    <Grid row fit>
      <WidgetCard v-for="entity in appStore.entities" :key="entity.entityId"
                  @click="$router.push(`/app/entities/${entity.entityId}`)">

        {{ entity.label }}
      </WidgetCard>
    </Grid>


    <TransitionRouterView :transition-key="$route.params.entity as string"/>
  </Grid>
</template>

<script setup lang="ts">

import {useAppStore} from "@/stores/index";

const appStore = useAppStore();
</script>

<style scoped lang="scss">

</style>
