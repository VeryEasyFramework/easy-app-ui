<template>


  <div class="connection-field" @click="handleClick">
    <!--        {{ value }}-->
    {{ titleValue || value }}
  </div>
</template>

<script setup lang="ts">
import type {EasyField} from "@vef/types";
import {useRouter} from "vue-router";


const {value, routePrefix, field, titleValue} = defineProps<{
  value: any;
  routePrefix?: string
  field?: EasyField
  titleValue?: any
}>()

const router = useRouter()

async function handleClick() {
  const path = `${routePrefix}/${value}`
  await router.push(path)

}
</script>

<style lang="scss">
.connection-field {
  cursor: pointer;
  //color: var(--color-primary);
  //font-weight: bold;

  &:hover {
    color: var(--color-primary);

  }
}

body[data-theme="dark"] {
  .connection-field {
    //color: var(--color-primary-brighter);

    &:hover {
      color: var(--color-primary-brighter);
    }
  }
}
</style>
