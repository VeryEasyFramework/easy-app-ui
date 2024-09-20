<template>
  <Container class="row horizontal-align-center vertical-align-center">

    <LoginForm></LoginForm>
  </Container>
</template>

<script setup lang="ts">

import Container from "@/components/layout/Container.vue";
import {onBeforeMount} from "vue";
import {useAppStore} from "@/stores/appStore.ts";
import LoginForm from "@/views/login/LoginForm.vue";

const appStore = useAppStore()
onBeforeMount(async () => {
  // const response = await easyApi.checkAuth()
  // console.log(response)
  // if ("sessionId" in response) {
  //   console.log('authenticated')
  //   window.location.href = '/v2'
  // } else {
  //   console.log('not authenticated')
  // }
})
</script>

<style lang="scss">
.main-grid {
  background-color: var(--color-primary-light);
}
</style>
