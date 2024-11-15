<template>
  <CardWidget class="">

    <Container class="row shrink">
      <div v-if="group.key != 'default'" class="title-4 text-primary">{{ group.title }}</div>
      <div v-if="group.description" class="title-6 pb-2 italic">{{ group.description }}</div>
      <Container class="group-fields col shrink column-gap-3 overflow-hidden" :class="{
    edit: edit
  }">

        <Container class="col-2 field-values">
          <Container v-for="field in filteredFields"
                     :key="`${field.key}value`">
            <EasyInput :editable="edit" :field="field" v-model="entry[field.key]"/>


          </Container>
        </Container>
      </Container>
    </Container>
  </CardWidget>
</template>

<script setup lang="ts">
import { Entry, FieldGroup, Settings } from "@vef/types/mod.ts";
import Container from "@/components/layout/Container.vue";
import CardWidget from "@/components/widgets/CardWidget.vue";
import { computed } from "vue";
import EasyInput from "@/components/inputs/EasyInput.vue";

const props = defineProps<{
  group: FieldGroup
  edit?: boolean
  entry: Entry | Settings
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
