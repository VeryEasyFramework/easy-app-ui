<template>


  <SideNavLayout>
    <template #nav>
      <SideNavBar>
        <template #top>
          <IconNav icon="home" label="Home" route="/app"/>
        </template>
      </SideNavBar>
    </template>
    <template #main>

      <Grid :columns="['1fr', 'max-content']" padding>
        <Grid row center>
          <div class="text-center">
            <div class="mb-3">

              <img src="/vef-small.png" alt="Very Easy Framework"/>
            </div>

            <div>
              <h1>Very Easy Framework</h1>
              <h2>{appName}</h2>

            </div>
          </div>
        </Grid>

        <APIExplorer style="width: 1200px;" :api="api"/>

      </Grid>
    </template>
  </SideNavLayout>
</template>
<script setup lang="ts">
import {onBeforeMount, onMounted, ref} from 'vue';


import {
  InputData,
  RootLayout,
  APIExplorer,
  TopNavLayout,
  IconNav,
  SideNavLayout,
  SideNavBar
} from "@eveffer/easy-client"
import {api} from "@/api/index.ts";

const apiDocs = ref<string>('')

onMounted(async () => {
  const result = await api.call("app", "apiDocs")
  apiDocs.value = JSON.stringify(result, null, 2)
});
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.docs {
  background-color: #1a1a1a;
  padding: 1em;
  border-radius: 0.5em;
  text-align: initial;
  overflow-x: auto;
}
</style>
