<template>
  <div class="position-relative input">

    <input type="search" placeholder="Type to search..." @input="handleInput"/>
    <!--    <MaterialIcon class="position-absolute right pe-2 center-y" size="1.2" icon="search"/>-->
  </div>
</template>

<script setup lang="ts">

import InputData from "@/components/inputs/InputData.vue";
import MaterialIcon from "@/components/icons/MaterialIcon.vue";
import {EntityDefinition} from "@/types/index.ts";
import {onMounted} from "vue";
import {EasyField, EasyFieldType} from "@/types/easyField.ts";
import {AdvancedFilter} from "@/api/apiTypes.ts";

const props = defineProps<{
  entity?: EntityDefinition
}>()
let fields: EasyField[] = []
const searchableTypes: EasyFieldType[] = ["DataField", "EmailField", "TextField", "IntField", "PhoneField"]
onMounted(() => {
  if (!props.entity) {
    throw new Error("EntitySearchInput requires an entity prop")
  }

  fields = props.entity.fields.filter(f => searchableTypes.includes(f.fieldType))
})

const emit = defineEmits<{
  (event: "search"): (filter: Record<string, AdvancedFilter>) => void
}>()

function handleInput(event: InputEvent) {
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
