<template>
  <Teleport to="#modals">
    <TransitionFade>

      <Container
          v-if="show"
          @click.self="close"
          class="modal-wrapper z-max position-fixed top left vh-100 vw-100 horizontal-align-center vertical-align-center">
        <CardWidget>

          <slot>
            modal
          </slot>
        </CardWidget>
      </Container>
    </TransitionFade>
  </Teleport>
</template>

<script setup lang="ts">

import Container from "@/components/layout/Container.vue";
import CardWidget from "@/components/widgets/CardWidget.vue";
import TransitionFade from "@/components/transitions/TransitionFade.vue";
import {computed, onMounted, ref} from "vue";
import {listenForKeyPress} from "@/utils/keyboard.ts";


function close() {
  show.value = false
  emit('close')
}

function open() {
  show.value = true
}

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
}>()


const show = computed({
  get: () => {
    return props.modelValue
  },
  set: (value) => {
    emit('update:modelValue', value)
  }
})

listenForKeyPress((event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    close()
  }
})
</script>

<style lang="scss">
.modal-wrapper {
  background-color: rgba(0, 0, 0, 0.5);

}
</style>
