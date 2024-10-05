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
            <EasyInput v-if="edit" :field="field" v-model="record[field.key]"/>
            <DisplayField :value="record[field.key]" v-else :field="field"
                          format="date"
                          :routePrefix="`/entity/${field.connectionEntity}`"/>

          </Container>
        </Container>
      </Container>
    </Container>
  </CardWidget>
</template>

<script setup lang="ts">
import {EntityRecord, FieldGroup} from "@vef/easy-api";
import Container from "@/components/layout/Container.vue";
import CardWidget from "@/components/widgets/CardWidget.vue";
import {computed} from "vue";
import DisplayField from "@/components/displayFields/DisplayField.vue";
import EasyInput from "@/components/inputs/EasyInput.vue";

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
