<template>
  <CardWidget class="px-3 py-2 full-width entity-list-item position-relative" :class="{
    active
  }" @click="$emit('select', record.id)">
    <Container class="row gap-1 shrink overflow-visible">
      <Container class="col shrink horizontal-align-between ">

        <div class="text-small text-primary bold item-label">

          {{ record[entityDef.config.titleField || 'id'] }}
        </div>

      </Container>
      <Container class="col shrink">
        <div v-for="field in fields" :key="field.key">
          <div class="text-small italic text-primary-bright">
            <component :is="displayFieldsMap[field.fieldType]"
                       :field="field"
                       format="date"
                       :routePrefix="`/entity/${field.connectionEntity}`"
                       :value="record[field.key]"
                       :titleValue="field.connectionTitleField? record[field.connectionTitleField]:''"
            />
          </div>
        </div>
      </Container>
    </Container>
    <Container class="gap-2 pe-2 pt-1 dates col shrink position-absolute top right">

      <Container class="col shrink text-tiny italic overflow-visible">
        <MaterialIcon icon="add" size="0.6"/>
        <DisplayTimestamp :value="record.createdAt" format="compact"/>
      </Container>
      <Container class="col shrink text-tiny italic overflow-visible">
        <MaterialIcon icon="update" size="0.6"/>

        <DisplayTimestamp :value="record.updatedAt" format="compact"/>
      </Container>
    </Container>
  </CardWidget>
</template>

<script setup lang="ts">
import type { EasyField, EntityDefinition, EntityRecord } from "@vef/types/mod.ts";
import CardWidget from "@/components/widgets/CardWidget.vue";
import Container from "@/components/layout/Container.vue";
import DisplayTimestamp from "@/components/displayFields/DisplayTimestamp.vue";
import MaterialIcon from "@/components/icons/MaterialIcon.vue";
import { displayFieldsMap } from "@/components/displayFields/index.ts";

defineProps<{
  entityDef: EntityDefinition,
  record: EntityRecord,
  active?: boolean
  fields?: EasyField[]

}>()

const emit = defineEmits<{
  select: [id: string]
}>()


</script>

<style lang="scss">
.entity-list-item {
  cursor: pointer;
  transition: all var(--snap-ease);
  border-inline-start: 0.2rem solid var(--color1-900);

  &:hover {
    border-inline-start: 0.2rem solid var(--color2-900);
  }

  &.active {
    border-inline-start: 0.2rem solid var(--color-secondary);

  }

  .dates {
    width: max-content;
  }
}
</style>
