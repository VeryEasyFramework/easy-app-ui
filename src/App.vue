<template>
  <RootLayout>
    <TransitionRouterView/>
  </RootLayout>
</template>

<script setup lang="ts">

import {onMounted} from "vue";
import {useAppStore} from "@/stores/appStore.ts";
import RootLayout from "@/components/layout/RootLayout.vue";
import TransitionRouterView from "@/components/transitions/TransitionRouterView.vue";
import {notify} from "@/notify/index.ts";
import {realtime} from "@/realtime/index.ts";


const appStore = useAppStore()
onMounted(async () => {
  if (import.meta.env.VITE_DEBUG) {
    document.title = 'DEBUG - ' + document.title
    document.body.classList.add('debug')
    notify({
      title: 'Dev Mode',
      message: 'Debug is enabled',
      type: 'warning'
    })
  }
  if (import.meta.env.VITE_GRID_DEBUG) {
    document.body.classList.add('grid-debug')
    notify({
      title: 'Dev Mode',
      message: 'Grid Debug is enabled',
      type: 'warning'
    })
  }



})

</script>


