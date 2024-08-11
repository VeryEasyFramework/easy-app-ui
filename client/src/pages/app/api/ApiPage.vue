<template>

  <div class="h-100 center" style="max-width: 1500px;">

    <APIExplorer :api="api"/>

  </div>
</template>

<script setup lang="ts">

import {api} from "@/api";


import {APIExplorer} from "@eveffer/easy-client";
</script>

<style scoped lang="scss">

</style>
