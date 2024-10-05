<template>

  <div>
    {{ value }}
  </div>
</template>

<script setup lang="ts">

import type {RichText} from "@vef/easy-api";
import PopoverNative from "@/components/modal/Popover.vue";

const props = defineProps<{
  value?: RichText
}>()
</script>

<style scoped lang="scss">

</style>
