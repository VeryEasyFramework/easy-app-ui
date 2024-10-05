<template>
  <Container class="entity-fields" :class="{
    edit: edit
  }">
    <div v-for="field in entityDef.fields">
      <EasyInput v-if="edit" :field="field" v-model="record[field.key]"/>
      <DisplayField v-else :field="field" :value="record[field.key]"/>
    </div>
  </Container>
</template>

<script setup lang="ts">
import type {EntityDefinition, EntityRecord} from "@vef/easy-api";
import EasyInput from "@/components/inputs/EasyInput.vue";
import DisplayField from "@/components/displayFields/DisplayField.vue";
import Container from "@/components/layout/Container.vue";

const props = defineProps<{
  record: EntityRecord,
  entityDef: EntityDefinition
  edit?: boolean
}>()
</script>

<style lang="scss">

.entity-fields {
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-auto-rows: max-content;
  row-gap: 1rem;

  &.edit {

  }
}

</style>
