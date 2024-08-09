<template>


  <SideNavLayout>
    <template #nav>
      <SideNavBar>
        <template #top>
          <div class="logo">

            <img src="/vef-small.png" alt="Very Easy Framework" />
          </div>

        </template>
        <template #middle>
          <IconNav icon="home" label="Home" route="/app" />
          <IconNav icon="api" label="API" route="/app/api" />
        </template>
        <template #bottom>
          <IconNav icon="logout" label="Logout" color="error" @click="appStore.logout" route="/login" />
        </template>
      </SideNavBar>
    </template>
    <template #main>
      <TransitionRouterView />
    </template>

  </SideNavLayout>
</template>
<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';


import {
  InputData,
  RootLayout,
  APIExplorer,
  TopNavLayout,
  IconNav,
  SideNavLayout,
  SideNavBar
} from "@eveffer/easy-client"
import { api } from "@/api/index.ts";
import { useAppStore } from "@/stores/index.ts";
import { client } from '@/realtime/realtimeClient';

const apiDocs = ref<string>('')
const appStore = useAppStore();
onMounted(async () => {
  client.connect();
  const result = await api.call("app", "apiDocs")
  apiDocs.value = JSON.stringify(result, null, 2)
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


.docs {
  background-color: #1a1a1a;
  padding: 1em;
  border-radius: 0.5em;
  text-align: initial;
  overflow-x: auto;
}
</style>
