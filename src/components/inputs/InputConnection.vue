<template>
  <div class="connection-input position-relative">

    <InputWrapper

        :label="field.label"
        :error="error"
        :required="field.required"
        :description="field.description"
        :read-only="field.readOnly">
      <input v-if="field.readOnly" :value="titleValue" disabled>
      <SelectDropDown v-else @open="handleOpen">


        <Container class="selected-item overflow-hidden" :class="{
            'empty': !titleValue,
          }">
          <div class="choice">{{ titleValue || `Choose ${connectionEntity?.config.label}` }}
          </div>
          <MaterialIcon class="arrow" :class="{
          active: open,
        }" icon="chevron_right"/>
        </Container>
        <template #dropdown="dropDownProps">
          <Container class="dropdown-container w-100 pt-2">
            <Container class="dropdown p-2">

              <input ref="input" v-model="searchValue" @input="handleInput"/>
              <Container>
                <div class="label">{{ `${connectionEntity?.config.label}s` }}</div>
                <Container class="row shrink">
                  <div class="search-item text-small" v-for="item in data" :key="item.id"
                       @click="selectItem(item,dropDownProps.hide)">
                    {{ item[titleFieldKey] || item.id }}
                  </div>
                </Container>
              </Container>

            </Container>
          </Container>
        </template>
      </SelectDropDown>
    </InputWrapper>

  </div>
</template>

<script setup lang="ts">
import {computed, onBeforeMount, onMounted, ref} from "vue";
import InputWrapper from "./InputWrapper.vue";
import {easyApi} from "@/api/index.ts";
import {entityStore} from "@/stores/entityStore.ts";
import Container from "@/components/layout/Container.vue";

import MaterialIcon from "@/components/icons/MaterialIcon.vue";
import {EasyField, EntityDefinition, EntityRecord} from "@vef/easy-api/src/types.ts";
import SelectDropDown from "@/components/inputs/SelectDropDown.vue";


const props = defineProps<{
  modelValue?: any;
  titleValue?: string | number;
  field: EasyField;
  error?: string;
  focus?: boolean;
}>();
const modelValue = computed({
  get: () => {
    return props.modelValue
  },
  set: (value) => {

    emit("update:modelValue", value)
    if (value) {
      emit("selected", value)
    }
  }
})
const titleValue = computed({
  get: () => {
    return props.titleValue
  },
  set: (value) => {
    emit("update:titleValue", value)
  }
})

function handleOpen(value: boolean) {
  open.value = value;
  if (value) {
    input.value?.focus();
    handleInput()
  }
  // if (value) {
  //   handleInput({target: input.value})
  // }
}

const emit = defineEmits(["update:modelValue", "update:titleValue", "selected"]);
const input = ref<HTMLInputElement>();


let connectionEntity: EntityDefinition
let titleFieldKey: string = 'id'
let titleField: EasyField | undefined
onBeforeMount(() => {
  const entity = entityStore.entities.find(e => e.entityId === props.field.connectionEntity)
  if (!entity) {
    throw new Error(`Entity ${props.field.connectionEntity} not found`)
  }

  connectionEntity = entity
  titleFieldKey = connectionEntity.config.titleField || 'id'
  titleField = connectionEntity.fields.find(f => f.key === titleFieldKey)

})
onMounted(() => {


  if (props.focus) {
    input.value?.focus();
  }

});

const searchValue = ref('')
const open = ref(false)


function selectItem(item: EntityRecord, callback: () => void) {

  modelValue.value = item.id
  titleValue.value = item[titleFieldKey]
  data.value = []
  open.value = false
  callback()
}

const data = ref<EntityRecord[]>([])


async function handleInput(event?: Event) {
  searchValue.value = (event?.target as HTMLInputElement)?.value || ''

  const idType = connectionEntity.config.idMethod?.type === 'number' ? '=' : 'contains'
  let filterKey = titleFieldKey || 'id'
  let filterOp = idType
  if (titleField) {
    filterKey = titleFieldKey
    filterOp = ["IntField", "DecimalField"].includes(titleField.fieldType as string) ? '=' : 'contains'
  }
  let filterValue: string | number = searchValue.value
  let filter = {}
  if (filterOp === '=') {

    filterValue = parseInt(searchValue.value)
    if (!isNaN(filterValue)) {
      filter = {
        [filterKey]: {
          op: filterOp,
          value: filterValue
        }
      }
    }
  }
  if (filterOp === 'contains' && filterValue) {
    filter = {
      [filterKey]: {
        op: filterOp,
        value: filterValue
      }
    }
  }

  const results = await easyApi.getList(props.field.connectionEntity!, {
    columns: [titleFieldKey, 'id'],
    limit: 10,
    filter,
    orderBy: titleFieldKey,
    order: "asc"
  })

  data.value = results.data
}
</script>

<style lang="scss">
.connection-input {
  .empty {
    color: var(--color-text-muted);
  }

  .dropdown-container {
    //box-shadow: var(--shadow-small);
  }

  .choice {


    line-height: 1.5;
    font-size: 0.7rem;
    border-radius: var(--border-radius);

    font-weight: bold;
    //background-color: var(--color-text-muted-brighter);
    &.active {
      color: var(--color-primary);
    }

    &:hover {
      cursor: pointer;
      border-color: var(--color-primary);
      color: var(--color-primary);
      //color: white;
    }


  }

  .selected-item {
    cursor: pointer;
    position: relative;
    line-height: var(--line-height);
    height: var(--line-height);
    font-size: 0.7rem;
    font-weight: bold;
    border: 1px solid transparent;
    border-radius: var(--border-radius);
    padding: 0 var(--padding-x);
    background-color: var(--color-primary-bright);
    color: white;
    align-items: center;
    max-width: 300px;
    box-sizing: border-box;
    overflow: hidden;

    .arrow {
      transition: rotate var(--snap-ease);
      position: absolute;
      right: 0.2rem;

      &.active {
        rotate: 90deg;
      }
    }

    &:hover {
      .arrow {
        rotate: 90deg;
      }

      .choice {

        color: white;
      }

      &.empty {
        .choice {
          color: var(--color-primary);
        }
      }
    }

    &.empty {
      color: var(--color-text-muted);
      border-color: var(--color-border);
      background-color: var(--color-input-bg);

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

</style>
