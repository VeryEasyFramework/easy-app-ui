<template>


  <div style="display: contents" @mouseenter="handleEnter"
       @mouseleave="handleLeave">
    <slot name="default"></slot>

  </div>
  <div ref="popover" class="popover" popover>


    <slot name="popover">

      <CardWidget class="shadow">
        <div class="label">

          {{ text }}
        </div>
      </CardWidget>
    </slot>


  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import CardWidget from "@/components/widgets/CardWidget.vue";

const props = defineProps<{
  text?: string;
  wait?: number;
  position?: "top" | "bottom" | "left" | "right";
}>();

const top = ref("0px");
const left = ref("0px");

const container = ref<HTMLElement | null>(null);
const popover = ref<HTMLElement>();


onMounted(() => {
});

const isIntersecting = ref(false);

function showPopover() {
  popover.value?.showPopover();
}


function hidePopover() {
  popover.value?.hidePopover();
}

function handleEnter(event: MouseEvent) {
  isIntersecting.value = true;
  setPosition((event.target as HTMLElement)?.firstElementChild?.getBoundingClientRect(), popover.value!);
  setTimeout(() => {
    if (!isIntersecting.value) return;
    showPopover();
  }, props.wait ?? 300);
}

function handleLeave() {
  isIntersecting.value = false;
  setTimeout(() => {
    hidePopover();
  }, props.wait ?? 300);
}

function setPosition(rect: DOMRect | undefined, popoverElement: HTMLElement) {
  if (!rect) return;
  const popoverHeight = popoverElement.offsetHeight;
  const popoverWidth = popoverElement.offsetWidth;
  let positionX;
  let positionY;

  if (window.innerHeight - rect?.top < popoverHeight!) {
    positionY = rect?.top - popoverHeight!;
  } else {
    positionY = rect?.top
  }

  if (window.innerWidth - rect?.left < popoverWidth!) {
    positionX = rect?.left + popoverWidth! + 5;
  } else {
    positionX = rect?.left + rect?.width + 5;
  }
  popoverElement.style.top = `${positionY}px`;
  popoverElement.style.left = `${positionX}px`;
  top.value = `${positionY}px`;
  left.value = `${positionX}px`;
}
</script>

<style lang="scss">
.popover {


  &[popover] {
    position: fixed;
    inset: 0;
    width: fit-content;
    height: fit-content;
    top: var(--popover-top);
    left: var(--popover-left);
    margin: 0;
    border: none;
    padding: 0;
    overflow: auto;
    color: unset;
    background-color: unset;
  }
}

.popover {

}

.popover {
  --popover-top: 0;
  --popover-left: 0;
}

</style>

