<template>
  <CardWidget>

    <Container class="row shrink">
      <div class="title-4 text-primary">{{ group.title }}</div>
      <ContainerPadded class="group-fields column-gap-3" :class="{
    edit: edit
  }">
        <Container class="field-names">

          <div class="text-small align-content-center bold"
               v-for="field in group.fields.filter(f=>!f.hidden)">

            {{ field.label }}
          </div>
        </Container>
        <Container class="row field-values">
          <div class="text-medium align-content-center" v-for="field in group.fields">


            <component :is="displayFieldsMap[field.fieldType]" :field="field"
                       :value="record[field.key]"/>
          </div>
        </Container>
      </ContainerPadded>
    </Container>
  </CardWidget>
</template>

<script setup lang="ts">
import {EntityRecord, FieldGroup} from "@/types/index.ts";
import Container from "@/components/layout/Container.vue";
import DisplayField from "@/components/displayFields/DisplayField.vue";
import EasyInput from "@/components/inputs/EasyInput.vue";
import {displayFieldsMap} from "@/components/displayFields/index.ts";
import ContainerPadded from "@/components/layout/ContainerPadded.vue";
import CardWidget from "@/components/widgets/CardWidget.vue";

const props = defineProps<{
  group: FieldGroup
  edit?: boolean
  record: EntityRecord
}>()
</script>

<style lang="scss">
.group-fields {
  --row-height: 1.2rem;
  grid-template-columns: max-content 1fr;

  .field-names {
    grid-template-columns: 1fr;
    grid-auto-rows: var(--row-height);
  }

  .field-values {
    grid-template-columns: 1fr;
    grid-auto-rows: var(--row-height);
  }

  &.edit {

  }
}
</style>
