<template>
  <Container class="entries-view-grid">
    <Container>
      <div class="title-2 pb-3 pt-2">

        Entry Types
      </div>
    </Container>
    <Container class="entries-grid">

      <WidgetTitled @click="$router.push(`/entry/${entry.entryType}`)"
                    v-for="entry in entryTypeStore.list()" :key="entry.entryType"
                    :title="entry.config.label" class="entry-card cursor-pointer disable-select">
        <div class="title-6">
          {{ entry.config.description || 'No description available.' }}
        </div>

      </WidgetTitled>
    </Container>

  </Container>
</template>

<script setup lang="ts">

import { onMounted } from "vue";
import { entryTypeStore } from "@/stores/entryTypeStore.ts";
import WidgetTitled from "@/components/widgets/WidgetTitled.vue";
import Container from "@/components/layout/Container.vue";


onMounted(() => {

});

</script>

<style lang="scss">

.entries-grid {
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(100px, 1fr));
}

.entries-view-grid {
  grid-template-rows: max-content 1fr;
}

.entry-card {
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
