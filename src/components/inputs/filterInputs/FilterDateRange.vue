<template>
  <Container>

    <div class="input">
      <DatePicker @selected="handleSelect"/>
    </div>

  </Container>
</template>

<script setup lang="ts">

import Container from "@/components/layout/Container.vue";
import type {EasyField} from "@vef/easy-api";
import DatePicker from "@/components/datePicker/DatePicker.vue";
import {AdvancedFilter} from "@/api/apiTypes.ts";
import {ref} from "vue";

const props = defineProps<{
  field: EasyField
}>()
const emit = defineEmits<{
  (event: 'input', value: AdvancedFilter): void
}>()

const filter = ref<AdvancedFilter>({
  op: 'between',
  value: []
})

function handleSelect(value: { from: string, to: string }) {
  const {from, to} = value
  if (from === to) {
    filter.value = {
      op: '=',
      value: from
    }
    emit('input', filter.value)
    return
  }
  filter.value = {
    op: 'between',
    value: [value.from, value.to]
  }
  emit('input', filter.value)
}
</script>

<style scoped lang="scss">

</style>
