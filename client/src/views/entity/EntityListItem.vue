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
import CardWidget from "@/components/widgets/CardWidget.vue";

defineProps<{
  entityDef: EntityDefinition,
  record: Entity,
  active?: boolean

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
}
</style>
