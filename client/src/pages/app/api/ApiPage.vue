<template>

  <Grid :columns="['1fr', '1fr']" padding>
    <Grid row center>

      <div class="text-center">
        <div class="mb-3">

          <img src="/vef-small.png" alt="Very Easy Framework"/>
        </div>

        <div class="color-white">
          <h1>Very Easy Framework</h1>
          <h2>{appName}</h2>

        </div>
      </div>
    </Grid>

    <APIExplorer :api="api"/>

  </Grid>
</template>

<script setup lang="ts">

import {api} from "@/api/index.ts";


import {APIExplorer} from "@eveffer/easy-client";
</script>

<style scoped lang="scss">

</style>
