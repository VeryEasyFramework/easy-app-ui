<template>
  <ListDetailLayout maxWidth="300px">
    <template #list>
      <EntryList :entry-type="entryType"
                 @select="(value)=>$router.push(`/entry/${entryType}/${value}`)" :key="entryType"/>
    </template>
    <template #detail>
      <TransitionRouterView :key="$route.params.id as string || '1' "/>
    </template>
  </ListDetailLayout>
</template>

<script setup lang="ts">
import ListDetailLayout from "@/components/layout/ListDetailLayout.vue";
import TransitionRouterView from "@/components/transitions/TransitionRouterView.vue";
import EntryList from "@/components/entries/EntryList.vue";
import { onMounted } from "vue";

const props = defineProps<{
  entryType: string
  id?: string
}>()

onMounted(() => {
})

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
