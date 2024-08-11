<template>


  <SideNavLayout>
    <template #nav>
      <SideNavBar>
        <template #top>
          <Popover text="Very Easy Framework">

            <div class="logo pointer" @click="router.push('/app')">

              <img src="/vef-small.png" alt="Very Easy Framework"/>
            </div>
          </Popover>

        </template>
        <template #middle>
          <IconNav color="info" icon="home" label="Home" route="/app"/>
          <IconNav route="/app/entities" icon="person" label="Entities" color="primary"/>

          <IconNav color="secondary" icon="api" label="API" route="/app/api"/>
          <IconNav color="accent" icon="communication" label="Realtime" route="/app/realtime"/>
        </template>
        <template #bottom>
          <IconNav icon="logout" label="Logout" color="error" @click="appStore.logout"
                   route="/login"/>
        </template>
      </SideNavBar>
    </template>
    <template #main>

      <div class="position-fixed logo-page" :class="{
        'faded': router.currentRoute.value.path !== '/app'
      }">


        <Grid row center>

          <div class="text-center grid grid-gap-2">
            <div class="mb-3">

              <img src="/vef-small.png" alt="Very Easy Framework"/>
            </div>

            <div class="color-white mb-4 ">
              <h1>Very Easy Framework</h1>
              <h2>{appName}</h2>
            </div>
            <div class="grid row-gap-3">

              <ButtonStandard @click="router.push('/app/api')">
                API Explorer
              </ButtonStandard>
              <ButtonStandard @click="router.push('/app/realtime')">
                Realtime Explorer
              </ButtonStandard>
            </div>
          </div>
        </Grid>

      </div>
      <TransitionRouterView/>

    </template>

  </SideNavLayout>
</template>
<script setup lang="ts">
import {onBeforeMount, onMounted, ref} from 'vue';


import {
  ButtonStandard,
  IconNav,
  Popover,
  SideNavLayout,
  SideNavBar
} from "@eveffer/easy-client"
import {api} from "@/api/index.ts";
import {useAppStore} from "@/stores/index.ts";
import {realtimeClient} from '@/api';
import {router} from "@/router/index.ts";


const appStore = useAppStore();
onMounted(async () => {
  realtimeClient.connect();
  await appStore.boot()
});
</script>
<style lang="scss" scoped>
.logo {

  height: 50px;
  will-change: filter;

  img {
    width: 40px;
    height: 40px;
  }

}

.logo-page {
  width: 100vw;
  height: 100vh;
  z-index: 1;
  transition: opacity var(--snap-ease-slow);
  pointer-events: none;

  &.faded {

    opacity: 0;
  }
}

.docs {
  background-color: #1a1a1a;
  padding: 1em;
  border-radius: 0.5em;
  text-align: initial;
  overflow-x: auto;
}
</style>
