<template>
  <RootLayout>
    <Grid justify="center">

      <APIExplorer style="width: 1200px;" :api="api" />
    </Grid>
    <img src="/vef-small.png" alt="Very Easy Framework" />
    <div>
      <h1>Very Easy Framework</h1>
      <h2>{appName}</h2>
      <InputData label="hello" />
      <h2>API Documentation</h2>
      <WidgetCard>

        <pre class="docs">{{ apiDocs }}</pre>
      </WidgetCard>
      <pre class="docs">{{ apiDocs }}</pre>
    </div>
  </RootLayout>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { api, websocket } from './api'

import { InputData, RootLayout, APIExplorer, Grid } from "@eveffer/easy-client"
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
