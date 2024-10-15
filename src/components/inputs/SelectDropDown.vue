<template>


  <div ref="dropdown" class="dropdown-container">
    <div @click="handleClick">

      <slot name="default">
        <Button></Button>
      </slot>
    </div>
    <div ref="popover" class="dropdown" popover="auto">


      <slot name="dropdown" :hide="hidePopover">

      </slot>


    </div>
  </div>

</template>

<script setup lang="ts">
import {onMounted, ref, useTemplateRef} from "vue";
import CardWidget from "@/components/widgets/CardWidget.vue";
import Button from "@/components/buttons/Button.vue";

const open = ref(false);
const props = defineProps<{}>()

const emit = defineEmits<{
  (event: 'open', value: boolean): void
}>()


const top = ref("0px");
const left = ref("0px");

function handleClick(evt: MouseEvent) {
  showPopover()
}

const popover = useTemplateRef<HTMLElement>('popover');

const dropdown = useTemplateRef<HTMLElement>('dropdown');


function showPopover() {
  setPosition();
  popover.value?.showPopover();
  open.value = true;
  emit('open', true)
}


function hidePopover() {
  popover.value?.hidePopover();
}


function setPosition() {
  const rect = dropdown.value?.getBoundingClientRect()
  if (!popover.value) return
  const el = popover.value
  el.style.top = `${rect?.bottom}px`
  el.style.left = `${rect?.left}px`
  el.style.width = `${rect?.width}px`
}

onMounted(() => {
  popover.value?.addEventListener('toggle', (event) => {
    const toggleEvent = event as ToggleEvent
    open.value = toggleEvent.newState === 'open'
    emit('open', toggleEvent.newState === 'open')
    console.log(toggleEvent.newState)
  })
  hidePopover();
})
</script>

<style lang="scss">
.dropdown-container {

  .dropdown {


    &[popover] {
      position: absolute;
      inset: 0;
      top: var(--popover-top);
      left: var(--popover-left);
      margin: 0;
      border: none;
      padding: 0;
      overflow: visible;
      color: unset;
      background-color: inherit;

    }
  }

}

.popover {
  --popover-top: 0;
  --popover-left: 0;
}

</style>

