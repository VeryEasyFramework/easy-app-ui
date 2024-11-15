<template>

  <Container class="toolbar col shrink">

    <TransitionFade speed="fast">
      <ButtonIcon v-if="editMode" icon="save" size="1" color="success"
                  @click="$emit('save')"/>
    </TransitionFade>
    <TransitionFade speed="fast">
      <ButtonIcon v-if="editMode" @click="$emit('delete')" icon="delete" size="1" color="error"/>
    </TransitionFade>
    <ButtonIcon @click="$emit('edit',!editMode)" :icon="editMode?'edit_off':'edit'"
                label="Edit Mode"
                color="warning" size="1"/>
  </Container>

</template>

<script setup lang="ts">

import ButtonIcon from "@/components/buttons/ButtonIcon.vue";
import Container from "@/components/layout/Container.vue";
import {listenForKeyPress, onControlS} from "@/utils/keyboard.ts";
import TransitionFade from "@/components/transitions/TransitionFade.vue";

const emit = defineEmits<{
  (e: 'edit', editMode: boolean): void
  (e: 'save'): void
  (e: 'delete'): void
}>()

const props = defineProps<{
  editMode: boolean
}>()

listenForKeyPress((e: KeyboardEvent) => {
  onControlS(e, () => {
    if (props.editMode) {
      emit('save')
    }
  })
})

</script>

<style scoped>

</style>
