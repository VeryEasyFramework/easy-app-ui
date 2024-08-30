<template>
  <ContainerPadded class="center-items">
    <CardWidget>

      <Button @click="router.push(`/entity/${entity.entityId}`)" class="center-items"
              v-for="entity in entityStore.entities"
              :key="entity.entityId">
        {{ entity.label }}
      </Button>
    </CardWidget>

  </ContainerPadded>
</template>

<script setup lang="ts">

import TransitionRouterView from "@/components/transitions/TransitionRouterView.vue";
import {onMounted} from "vue";
import {entityStore} from "@/stores/entityStore.ts";
import ContainerPadded from "@/components/layout/ContainerPadded.vue";
import CardWidget from "@/components/CardWidget.vue";
import Button from "@/components/buttons/Button.vue";
import {router} from "@/router/index.ts";


onMounted(() => {

});

</script>

<style scoped>

</style>
