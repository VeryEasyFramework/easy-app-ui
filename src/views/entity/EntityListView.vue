<template>
  <ListDetailLayout maxWidth="300px">
    <template #list>
      <EntityList :entity="entity" :activeEntity="id"
                  @select="(value)=>$router.push(`/entity/${entity}/${value}`)" :key="entity"/>
    </template>
    <template #detail>
      <TransitionRouterView :key="props.id"/>
    </template>
  </ListDetailLayout>
</template>

<script setup lang="ts">
import ListDetailLayout from "@/components/layout/ListDetailLayout.vue";
import EntityList from "@/components/entities/EntityList.vue";
import TransitionRouterView from "@/components/transitions/TransitionRouterView.vue";
import {listenForKeyPress, onControlN} from "@/utils/keyboard.ts";

const props = defineProps<{
  entity: string
  id?: string
}>()


</script>

<style scoped>
.sort {
  font-weight: bold;
  color: var(--color-success-darker);
}

.search-filter {
  grid-template-columns: minmax(max-content, 400px) max-content;

}

.table-container {
  grid-template-rows:  max-content 1fr;
}

.list-container {
  grid-template-rows:  max-content 1fr;
}

</style>
