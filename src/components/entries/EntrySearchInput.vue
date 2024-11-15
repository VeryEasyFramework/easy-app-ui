<template>
  <div class="position-relative input">

    <input type="search" placeholder="Type to search..." @input="handleInput"/>
    <!--    <MaterialIcon class="position-absolute right pe-2 center-y" size="1.2" icon="search"/>-->
  </div>
</template>

<script setup lang="ts">

import { AdvancedFilter, EasyField, EasyFieldType, EntryType } from "@vef/types/mod.ts";
import { onMounted } from "vue";

const props = defineProps<{
  entryType?: EntryType
}>()
let fields: EasyField[] = []
const searchableTypes: EasyFieldType[] = ["DataField", "EmailField", "TextField", "IntField", "PhoneField"]
onMounted(() => {
  if (!props.entryType) {
    throw new Error("Entry SearchInput requires an entry type prop")
  }

  fields = props.entryType.fields.filter(f => searchableTypes.includes(f.fieldType))
})

const emit = defineEmits<{
  (e: 'search', filter: Record<string, any>): void
}>()


function handleInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  const filter: Record<string, AdvancedFilter> = {}
  fields.forEach(f => {
    const fieldType = f.fieldType
    let op: AdvancedFilter["op"] = "contains"
    if (fieldType === "IntField") {
      const num = parseInt(value)
      if (isNaN(num)) {
        return
      }
      op = "="
      filter[f.key] = {
        op,
        value: num
      }
      return
    }

    filter[f.key] = {
      op,
      value: value
    }
  })
  emit("search", filter)
}
</script>

<style scoped>

</style>
