<template>
  <div class="connection-input position-relative">

    <InputWrapper
        class="overflow-visible"
        :label="label"
        :error="error"
        :required="required"
        :read-only="readOnly">
      <input
          :name="name"
          ref="input"
          @input="handleInput"
          type="text"
          :disabled="readOnly"/>

    </InputWrapper>
    <CardWidget class="dropdown-container w-100">
      <Container class="row shrink">

        <div class="search-item text-small" v-for="item in data">
          {{ item.title || item.id }}
        </div>
      </Container>
      <!--        {{ data }}-->
    </CardWidget>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import InputWrapper from "./InputWrapper.vue";
import {EasyField} from "@/types/easyField.ts";
import {easyApi} from "@/api/index.ts";
import {EntityRecord} from "@/types/index.ts";
import {entityStore} from "@/stores/entityStore.ts";
import CardWidget from "@/components/widgets/CardWidget.vue";
import Container from "@/components/layout/Container.vue";


const props = defineProps<{
  modelValue?: any;
  label?: string;
  field: EasyField;
  error?: string;
  name?: string;
  required?: boolean;
  readOnly?: boolean;
  focus?: boolean;
}>();
const emit = defineEmits(["update:modelValue"]);
const input = ref<HTMLInputElement>();
const inputValue = computed({
  get: () => {
    return props.modelValue;
  },
  set: (value) => {
    emit("update:modelValue", value);
  },
});
onMounted(() => {
  if (props.focus) {
    input.value?.focus();
  }
});

const searchValue = ref('')

const selectedItem = ref<{ id: number, title: string } | null>(null)

const data = ref<EntityRecord[]>([])
let connectionEntity = entityStore.entities.find(e => e.entityId === props.field.connectionEntity)

async function handleInput(event: Event) {
  searchValue.value = (event.target as HTMLInputElement).value
  const titleField = connectionEntity?.config.titleField || 'id'
  const results = await easyApi.getList(props.field.connectionEntity!, {
    columns: [titleField, 'id'],
    limit: 10,
    filter: {
      [titleField]: {
        op: 'contains',
        value: searchValue.value
      }
    }

  })

  data.value = results.data
}
</script>

<style lang="scss">
.connection-input {
  position: relative;
  overflow: visible;

  .dropdown-container {
    position: absolute;
    top: 100%;
    left: 0;
    width: max-content;
    z-index: 100;

    .search-item {
      cursor: pointer;
      padding: 0.2rem;
      border-bottom: 1px solid var(--color-border);

      &:hover {
        background-color: var(--color-bg-hover);
      }
    }
  }
}
</style>
