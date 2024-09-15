<template>

  <form class="form" :name="name"
        @submit.prevent="$emit('submitted')">
    <ContainerPadded class="row shrink gap-3">
      <div class="title-3 text-center">{{
          formatString(name || "", "titleCase", "camelCase")
        }}
      </div>

      <Container class="gap-3" :class="{
        [`col-${columns}`]: columns,
        'row':!columns
      }">

        <slot>
          Form
        </slot>
      </Container>
      <Container class="col shrink horizontal-align-end gap-3">
        <div>

          <slot name="cancel">
            <Button color="error" @click="handleCancel">{{ cancelText || 'Cancel' }}</Button>
          </slot>
        </div>
        <div>

          <slot name="submit">
            <Button @submit="handleSubmit" color="success" type="submit">{{
                submitText || 'Submit'
              }}
            </Button>
          </slot>
        </div>
      </Container>
    </ContainerPadded>
  </form>
</template>

<script setup lang="ts">

import FormBase from "@/components/form/FormBase.vue";
import Button from "@/components/buttons/Button.vue";
import Container from "@/components/layout/Container.vue";
import ContainerPadded from "@/components/layout/ContainerPadded.vue";
import {formatString} from "@/utils/index.ts";

const props = defineProps<{
  name?: string
  submitText?: string
  cancelText?: string
  columns?: number | string
}>()

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'submitted'): void
}>()


function handleSubmit() {
  emit("submitted")
}

function handleCancel() {
  emit("cancel")
}
</script>

<style scoped>

</style>
