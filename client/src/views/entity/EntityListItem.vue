<template>
  <CardWidget class="full-width entity-list-item" :class="{
    active
  }" @click="$emit('select', record.id)">
    <div class="text-small text-primary bold item-label">

      {{ record[entityDef.titleField || 'id'] }}
    </div>

  </CardWidget>
</template>

<script setup lang="ts">
import {Entity, EntityDefinition} from "@/types/index.ts";
import CardWidget from "@/components/CardWidget.vue";
import Container from "@/components/layout/Container.vue";

const props = defineProps<{
  entityDef: EntityDefinition,
  record: Entity,
  active?: boolean

}>()

const emit = defineEmits<{
  select: (id: string) => void
}>()
</script>

<style>
.entity-list-item {
  cursor: pointer;
  transition: all var(--snap-ease);

  &:hover, &.active {
    background-color: var(--color-primary);

    .item-label {

      color: var(--color-white);
    }
  }
}
</style>
