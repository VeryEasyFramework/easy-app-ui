<template>
  <RootLayout>
    <Container class="row horizontal-align-center vertical-align-center">

      <LoginForm></LoginForm>
    </Container>
  </RootLayout>
</template>

<script setup lang="ts">

import RootLayout from "@/components/layout/RootLayout.vue";
import LoginForm from "@login/LoginForm.vue";
import Container from "@/components/layout/Container.vue";
import {onBeforeMount} from "vue";
import {easyApi} from "@/api/index.ts";
import {useAppStore} from "@/stores/appStore.ts";

const appStore = useAppStore()
onBeforeMount(async () => {
  appStore.initTheme()
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
