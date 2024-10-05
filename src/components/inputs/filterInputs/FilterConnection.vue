<template>
  <Container class="filter-connection">

    <div class="input">

      <input
          :name="name"
          ref="input"
          :placeholder="`Search ${connectionEntity?.config.label}s...`"
          @input="handleInput"
          type="text"
      />
    </div>

    <Container class="results row shrink row-gap-0">
      <Container
          class="col shrink horizontal-align-between row-gap-0 selected-item text-small py-1 px-1"
          v-for="item in values" :key="item.id"
          @click="handleRemove(item)">
        <div>

          {{ item.label }}
        </div>
        <MaterialIcon class="close" icon="close" size="0.8"/>
      </Container>
      <div class="search-item text-small py-1 px-1"
           v-for="item in data.filter(i=>!values.map(v=>v.id).includes(i.id))" :key="item.id"
           @click="handleSelect(item)">
        {{ item[titleField] || item.id }}
      </div>
    </Container>
    <!--        {{ data }}-->
  </Container>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {EasyField, EntityRecord} from "@vef/easy-api";
import {easyApi} from "@/api/index.ts";
import {entityStore} from "@/stores/entityStore.ts";
import Container from "@/components/layout/Container.vue";
import MaterialIcon from "@/components/icons/MaterialIcon.vue";


const props = defineProps<{
  label?: string;
  field: EasyField;
  name?: string;
  focus?: boolean;
  values: Array<{ id: string | number, label: string }>;
}>();

const input = ref<HTMLInputElement>();

onMounted(() => {
  if (props.focus) {
    input.value?.focus();

  }
});

const searchValue = ref('')

const selectedItem = ref<{ id: string | null, title: string }>({
  id: null,
  title: ''
})
const titleField = ref('')
const data = ref<EntityRecord[]>([])
let connectionEntity = entityStore.entities.find(e => e.entityId === props.field.connectionEntity)

async function handleInput(event?: Event) {
  searchValue.value = (event?.target as HTMLInputElement).value || ''
  titleField.value = connectionEntity?.config.titleField || 'id'
  const columns = ['id']
  if (titleField.value !== 'id') {
    columns.push(titleField.value)
  }
  const results = await easyApi.getList(props.field.connectionEntity!, {
    columns,
    limit: 10,
    orderBy: connectionEntity?.config.orderField || 'id',
    order: connectionEntity?.config.orderDirection || 'desc',
    filter: {
      [titleField.value]: {
        op: 'contains',
        value: searchValue.value
      }
    }

  })

  data.value = results.data

}

const emit = defineEmits<{
  (event: 'selected', value: { id: string | number, label: string }): void
  (event: 'remove', item: { id: string | number, label: string }): void
}>()

function handleRemove(item: { id: string | number, label: string }) {
  emit('remove', item)
}

function handleSelect(item: EntityRecord) {
  selectedItem.value.id = item.id
  selectedItem.value.title = item[titleField.value]
  // input.value!.value = item[titleField.value]
  // input.value!.value = ''
  // data.value = []
  emit('selected', {id: item.id, label: item[titleField.value]})
}

</script>

<style lang="scss">
.filter-connection {
  .results {
    //max-height: 200px;

    .selected-item {
      cursor: pointer;
      user-select: none;
      color: var(--color-primary);

      .close {
        opacity: 0;

      }

      &:hover {
        color: var(--color-error);

        .close {

          opacity: 1;
        }
      }
    }

    .search-item {
      user-select: none;
      cursor: pointer;
      border-radius: var(--border-radius);

      &:hover {
        color: var(--color-primary);
      }
    }
  }

}

body[data-theme="dark"] {
  .filter-connection {
    .results {
      .selected-item {
        color: var(--color-primary-bright);

        &:hover {
          color: var(--color-error-bright);
        }
      }

      .search-item {
        &:hover {
          color: var(--color-primary-bright);
        }
      }
    }
  }
}
</style>
