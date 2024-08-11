<template>
  <div class="h-100 center" style="max-width: 1500px;">

    <SocketExplorer :api="api" :socket="realtimeClient"/>
  </div>

</template>

<script setup lang="ts">


import {api, realtimeClient} from "@/api";
import {SocketExplorer} from "@eveffer/easy-client";
</script>

<style scoped></style>
