<template>
  <RootLayout>
    <ContainerPadded class="main-container">

      <SiteHeader>
        <template #logo>
          <HeaderLogo/>
        </template>
        <template #navigation>
          <NavigationBar/>
        </template>
        <template #user>
          <Container>
            <ThemeSwitcher/>
          </Container>
        </template>
      </SiteHeader>
      <TransitionRouterView :transition-key="$route.path"/>
      <LoaderOverlay :loaded="appStore.booted"/>
    </ContainerPadded>
  </RootLayout>
</template>

<script setup lang="ts">

import SiteHeader from "@/components/SiteHeader.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import HeaderLogo from "@/components/HeaderLogo.vue";
import {onMounted} from "vue";
import {useAppStore} from "@/stores/appStore.ts";
import RootLayout from "@/components/layout/RootLayout.vue";
import ContainerPadded from "@/components/layout/ContainerPadded.vue";
import TransitionRouterView from "@/components/transitions/TransitionRouterView.vue";
import {notify} from "@/notify/index.ts";
import Loader from "@/components/transitions/Loader.vue";
import LoaderOverlay from "@/components/transitions/LoaderOverlay.vue";
import NavigationItem from "@/components/NavigationItem.vue";
import Container from "@/components/layout/Container.vue";
import ThemeSwitcher from "@/components/buttons/ThemeSwitcher.vue";


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
  await new Promise(resolve => setTimeout(resolve, 1000))


})

</script>

<style>
.main-container {
  grid-template-rows: 2rem 1fr;
}
</style>
