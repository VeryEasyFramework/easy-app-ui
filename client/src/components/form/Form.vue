<template>
  <form class="form" :name="name" @submit.stop.prevent="$emit('submitted')">
    <slot>
      Form
    </slot>
  </form>
</template>

<script setup lang="ts">

const emits = defineEmits(['submitted'])

const props = defineProps<{
  name?: string
}>()
</script>

<style scoped>

</style>
