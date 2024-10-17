<template>


  <div ref="dropdown" class="dropdown-container">
    <div @click="handleClick">

      <slot name="default">
        <Button></Button>
      </slot>
    </div>
    <div ref="popover" class="select-dropdown" popover="auto">


      <slot name="dropdown" :hide="hidePopover">

      </slot>


    </div>
  </div>

</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref, useTemplateRef} from "vue";
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
  if (open.value) {
    hidePopover()
    return
  }
  showPopover()
}

const popover = useTemplateRef<HTMLElement>('popover');

const dropdown = useTemplateRef<HTMLElement>('dropdown');


function showPopover() {
  // setPosition();
  popover.value?.showPopover();
  open.value = true;
  emit('open', true)
}


function hidePopover() {
  popover.value?.hidePopover();
}


function setPosition(target?: HTMLElement) {
  const parentRect = dropdown.value?.getBoundingClientRect()
  const popoverEl = target || popover.value

  if (!popoverEl) {
    return
  }

  const windowHeight = window.innerHeight
  const windowWidth = window.innerWidth

  const popoverRect = popoverEl.getBoundingClientRect()
  const parentHeight = parentRect?.height || 0
  const parentWidth = parentRect?.width || 0
  const topPos = parentRect?.top || 0
  const leftPos = parentRect?.left || 0
  const rightPos = parentRect?.right || 0
  const bottomPos = parentRect?.bottom || 0
  const popoverHeight = popoverRect.height
  const popoverWidth = popoverRect.width

  const topPosValue = bottomPos + popoverHeight > windowHeight ? topPos - popoverHeight - 8 : topPos + parentHeight
  const leftPosValue = rightPos + popoverWidth > windowWidth ? windowWidth - popoverWidth : rightPos

  top.value = `${topPosValue}px`
  left.value = `${leftPos}px`

  popoverEl.style.setProperty('--popover-top', top.value)
  popoverEl.style.setProperty('--popover-left', left.value)
  popoverEl.style.opacity = '1'
  popoverEl.style.minWidth = `${parentWidth}px`;

}

function handleScroll(event: WheelEvent) {
  const target = event.target as HTMLElement
  if (target.closest('.select-dropdown[popover]')) {
    return
  }

  hidePopover()
}

onMounted(() => {

  popover.value?.addEventListener('toggle', (event) => {
    const toggleEvent = event as ToggleEvent
    open.value = toggleEvent.newState === 'open'
    const target = event.target as HTMLElement
    if (toggleEvent.newState === 'open') {
      window.addEventListener('wheel', handleScroll)
      setPosition(target)

    }
    if (toggleEvent.newState === 'closed') {
      window.removeEventListener('wheel', handleScroll)
      target.style.opacity = '0'
    }
    emit('open', toggleEvent.newState === 'open')
  })
  hidePopover();
})


</script>

<style lang="scss">
.dropdown-container {

  .select-dropdown {


    &[popover] {
      position: absolute;
      inset: 0;
      top: var(--popover-top);
      left: var(--popover-left);
      margin: 0;
      border: none;
      padding: 0;
      overflow: visible;
      opacity: 0;
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

