<template>
  <Container>
    <ButtonIcon @click="appStore.toggleTheme"
                :icon="appStore.theme == 'dark'?'light_mode':'dark_mode'"
                :color="appStore.theme == 'dark'?'warning':'info'"
                class="flat"/>
  </Container>
</template>

<script setup lang="ts">

import InputBoolean from "@/components/inputs/InputBoolean.vue";
import {useAppStore} from "@/stores/appStore.ts";
import Container from "@/components/layout/Container.vue";
import MaterialIcon from "@/components/icons/MaterialIcon.vue";
import ButtonIcon from "@/components/buttons/ButtonIcon.vue";

const appStore = useAppStore();
</script>

<style scoped>


.theme-switcher:hover {
  background-color: var(--color-primary);
}

</style>
