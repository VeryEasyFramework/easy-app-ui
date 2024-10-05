<template>
  <Container class="row horizontal-align-center vertical-align-center">

    <LoginForm></LoginForm>
  </Container>
</template>

<script setup lang="ts">

import Container from "@/components/layout/Container.vue";
import {useAppStore} from "@/stores/appStore.ts";
import LoginForm from "@/views/login/LoginForm.vue";

const appStore = useAppStore()

</script>

<style lang="scss">
.main-grid {
  background-color: var(--color-primary-light);
}
</style>
