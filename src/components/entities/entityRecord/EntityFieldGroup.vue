<template>
  <CardWidget class="">

    <Container class="row shrink">
      <div class="title-4 text-primary">{{ group.title }}</div>
      <Container class="group-fields col shrink column-gap-3 overflow-hidden" :class="{
    edit: edit
  }">

        <Container class="col-2 field-values">
          <Container v-for="field in filteredFields"
                     :key="`${field.key}value`">
            <div class="label">{{ field.label }}</div>
            <component v-if="edit" :is="fieldMap[field.fieldType]" :field="field"
                       v-model="record[field.key]"
            />
            <component v-else :is=" displayFieldsMap[field.fieldType]" :field="field"
                       :titleValue="field.connectionTitleField? record[field.connectionTitleField]:''"
                       format="date"
                       :routePrefix="`/entity/${field.connectionEntity}`"
                       :value="record[field.key]"/>
          </Container>
        </Container>
      </Container>
    </Container>
  </CardWidget>
</template>

<script setup lang="ts">
import {EntityRecord, FieldGroup} from "@/types/index.ts";
import Container from "@/components/layout/Container.vue";
import {displayFieldsMap} from "@/components/displayFields/index.ts";
import CardWidget from "@/components/widgets/CardWidget.vue";
import {computed} from "vue";
import {fieldMap} from "@/components/inputs/index.ts";

const props = defineProps<{
  group: FieldGroup
  edit?: boolean
  record: EntityRecord
}>()

const filteredFields = computed(() => {
  return props.group.fields.filter(f => {
    if (f.hidden) {

      return false;
    }
    if (f.fetchOptions?.thisIdKey) {

      return false;
    }
    return true;
  })
})
</script>

<style lang="scss">
.group-fields {
  --row-height: max-content;


  .field-values {
    grid-auto-rows: minmax(1rem, max-content);
    font-size: 0.8rem;
  }

  &.edit {

  }
}
</style>
