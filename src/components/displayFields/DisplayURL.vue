<template>

  <div class="url-field">

    <a :href="url?.href" target="_blank">{{ url?.href }}</a>
  </div>

</template>

<script setup lang="ts">
import type {EasyField} from "@vef/easy-api";
import {onMounted, ref} from "vue";


const props = defineProps<{
  value: any;
  field?: EasyField
}>()
const url = ref<URL | null>()
onMounted(() => {
  if (!props.value) return
  try {
    url.value = new URL(props.value)
  } catch (e) {
  }
})
</script>

<style scoped>
.url-field {
  white-space: break-spaces;
  word-wrap: break-word;
  word-break: break-all;
  max-width: 200px;
  height: max-content;

}
</style>
