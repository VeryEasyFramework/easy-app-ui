<template>
  <ContainerPadded class="toast-wrapper overflow-hidden">

    <TransitionGroup name="toast">
      <div
          class="toast px-4 py-2"
          :class="item.type"
          v-for="item in store.notifications"
          :key="item.id">
        <Container class="row shrink">

          <div class="title-5">{{ item.title }}</div>
          <div>{{ item.message }}</div>
        </Container>
      </div>
    </TransitionGroup>
  </ContainerPadded>
</template>

<script setup lang="ts">


import {useNotificationStore} from "./index";
import CardWidget from "@/components/widgets/CardWidget.vue";
import ContainerPadded from "@/components/layout/ContainerPadded.vue";
import Container from "@/components/layout/Container.vue";


const store = useNotificationStore();
</script>

<style scoped>
.toast-wrapper {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 50vw;
  min-width: 350px;
  max-width: 450px;
  height: max-content;
  grid-auto-flow: row;
  grid-auto-rows: max-content;
  z-index: 10000;
}

.toast {
  --border-color: var(--color-primary-darker);
  background-color: var(--color-white);
  border-radius: var(--border-radius);
  height: 60px;
  box-shadow: var(--shadow);
  border-inline-start: 0.4rem solid var(--border-color);
  border-top: 0.1rem solid var(--border-color);
  border-bottom: 0.1rem solid var(--border-color);
}

.error {
  --border-color: var(--color-error-bright);
}

.info {
  --border-color: var(--color-info-bright);
}

.success {
  --border-color: var(--color-success-bright);
}

.warning {
  --border-color: var(--color-warning-bright);
}

.toast-move, /* apply transition to moving elements */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.toast-enter-from {
  opacity: 0;
  height: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(60px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.toast-leave-active {
}
</style>
