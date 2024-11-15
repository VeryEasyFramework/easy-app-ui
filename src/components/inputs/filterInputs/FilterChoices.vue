<template>
  <Container class="choices-filter horizontal-align-center">
    <div class="input">
      <input type="text" @input="handleInput" ref="input" placeholder="Search...">
    </div>
    <Container class="row shrink choices-wrapper">
      <Container
          class="col shrink horizontal-align-between selected-item text-small"
          v-for="item in values" :key="item.id"
          @click="handleRemove(item)">
        <div class="choice">

          {{ item.label }}
        </div>
        <MaterialIcon class="close" icon="close"/>
      </Container>
      <div @click="handleSelect(choice)" class="choice" :class="{
          [choice.color??'']: true,
        }" v-for="(choice,index) in filteredChoices" :key="index">

        {{ choice.label }}
      </div>
    </Container>
  </Container>
</template>

<script setup lang="ts">

import Container from "@/components/layout/Container.vue";
import { EasyField } from "@vef/types/mod.ts";
import { computed, onMounted, ref } from "vue";
import MaterialIcon from "@/components/icons/MaterialIcon.vue";

const props = defineProps<{
  field: EasyField;
  focus?: boolean;
  values: Array<{ id: string | number, label: string }>;
}>()
const input = ref<HTMLInputElement>()
const searchValue = ref('')
const filteredChoices = computed(() => {
  return props.field.choices?.filter((choice) => {
    if (props.values.map(v => v.id).includes(choice.key as string)) {
      return false
    }
    if (choice.label.toLowerCase().includes(searchValue.value.toLowerCase())) {
      return choice
    }
  })
})

function handleInput(event: Event) {
  searchValue.value = (event?.target as HTMLInputElement).value || ''
}

const emit = defineEmits<{
  (event: 'selected', value: {
    id: string | number
    label: string
  }): void
  (event: 'remove', item: { id: string | number, label: string }): void
}>()

function handleSelect(choice: any) {
  emit('selected', {
    id: choice.key,
    label: choice.label
  })
}

function handleRemove(item: { id: string | number, label: string }) {
  emit('remove', item)
}

onMounted(() => {
  if (props.focus) {
    input.value?.focus();

  }
});
</script>

<style scoped lang="scss">
.choices-filter {
  grid-template-rows: max-content 1fr;

  .choices-wrapper {
    //max-height: 200px;
    .selected-item {
      cursor: pointer;

      .choice {


        background-color: var(--color-primary-brighter);
        color: var(--color-primary-darker);
        font-weight: bold;
        border-radius: var(--border-radius);
      }

      .close {
        opacity: 0;

      }

      &:hover {
        color: var(--color-error);


        .close {

          opacity: 1;
        }
      }


      .search-item {
        cursor: pointer;
        border-radius: var(--border-radius);

        &:hover {
          color: var(--color-primary);
        }
      }
    }


    .choice {


      width: fit-content;
      padding: 0.25rem 0.5rem;
      line-height: 1.5;
      font-size: 0.7rem;
      border-radius: var(--border-radius);
      color: var(--color-text-muted-darker);
      font-weight: bold;
      background-color: var(--color-text-muted-brighter);

      &:hover {
        cursor: pointer;
        border-color: var(--color-primary);
        background-color: var(--color-primary);
        color: white;
      }


    }
  }
}
</style>
