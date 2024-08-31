<template>
  <Container class="entities-view-grid">
    <Container>
      <div class="title-2 pb-3 pt-2">

        Entities
      </div>
    </Container>
    <Container class="entities-grid">

      <WidgetTitled @click="$router.push(`/entity/${entity.entityId}`)"
                    v-for="entity in entityStore.entities" :key="entity.entityId"
                    :title="entity.label" class="entity-card cursor-pointer disable-select">
        <div class="title-6">
          {{ entity.description || 'No description available.' }}
        </div>

      </WidgetTitled>
    </Container>

  </Container>
</template>

<script setup lang="ts">

import TransitionRouterView from "@/components/transitions/TransitionRouterView.vue";
import {onMounted} from "vue";
import {entityStore} from "@/stores/entityStore.ts";
import ContainerPadded from "@/components/layout/ContainerPadded.vue";
import CardWidget from "@/components/widgets/CardWidget.vue";
import Button from "@/components/buttons/Button.vue";
import {router} from "@/router/index.ts";
import WidgetTitled from "@/components/widgets/WidgetTitled.vue";
import Container from "@/components/layout/Container.vue";


onMounted(() => {

});

</script>

<style lang="scss">

.entities-grid {
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(100px, 1fr));
}

.entities-view-grid {
  grid-template-rows: max-content 1fr;
}

.entity-card {
  border-inline-start: 0.2rem solid var(--color-accent);
  transition: all var(--snap-ease);

  &:hover {
    border-inline-start: 0.2rem solid var(--color-secondary);
    box-shadow: var(--shadow);

  }

  &:active {
    border-inline-start: 0.2rem solid var(--color-primary);
  }
}
</style>
